/* A minimal in-memory stand-in for the Admin Firestore API surface our
 * handlers use, for local testing without a live project/emulator. */
class FakeDoc {
  constructor(store, id) { this.store = store; this.id = id; }
  async get() {
    const data = this.store.get(this.id);
    return { exists: data !== undefined, data: () => data };
  }
  async set(data) { this.store.set(this.id, data); }
}
class FakeQuery {
  constructor(store, field, val) { this.store = store; this.field = field; this.val = val; }
  async get() {
    const docs = [...this.store.entries()]
      .filter(([, v]) => v[this.field] === this.val)
      .map(([id, v]) => ({ id, data: () => v }));
    return { docs };
  }
}
class FakeCollection {
  constructor(store) { this.store = store; }
  doc(id) { return new FakeDoc(this.store, id); }
  where(field, op, val) {
    if (op !== '==') throw new Error('fake db only supports ==');
    return new FakeQuery(this.store, field, val);
  }
}
class FakeFirestore {
  constructor() { this.collections = new Map(); }
  collection(name) {
    if (!this.collections.has(name)) this.collections.set(name, new Map());
    return new FakeCollection(this.collections.get(name));
  }
}
module.exports = { FakeFirestore };
