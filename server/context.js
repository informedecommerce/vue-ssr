// server/ssr_context.js
// stolen from https://github.com/kadirahq/flow-router/blob/ssr/server/ssr_context.js

import { FastRender } from 'meteor/communitypackages:fast-render'

export default class SsrContext {
  constructor () {
    this._collections = {}
  }

  getCollection (collName) {
    let collection = this._collections[collName]
    if (!collection) {
      const minimongo = Package.minimongo
      collection = this._collections[collName] = new minimongo.LocalCollection()
    }

    return collection
  }

  addSubscription (name, params) {
    const fastRenderContext = FastRender.frContext.get()
    if (!fastRenderContext) {
      throw new Error(
        `Cannot add a subscription: ${name} without FastRender Context`
      )
    }

    const data = fastRenderContext.subscribe(name, ...params)
    this.addData(data)
  }

  addData (data) {
    _.each(data, (collDataCollection, collectionName) => {
      const collection = this.getCollection(collectionName)
      collDataCollection.forEach((collData) => {
        collData.forEach((item) => {
          const existingDoc = collection.findOne(item._id)
          if (existingDoc) {
            const newDoc = { ...existingDoc, ...item }
            delete newDoc._id
            collection.update(item._id, { $set: newDoc })
          } else {
            collection.insert(item)
          }
        })
      })
    })
  }
}
