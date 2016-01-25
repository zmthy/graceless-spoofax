// The order that methods appear in an object should not be important.

type Object = type {}

type Pair = type {
  first() -> Object
  second() -> Object
}

method pair(first : Object, second : Object) -> Pair {
  object {
    method second() -> Object {
      second
    }

    method first() -> Object {
      first
    }
  }
}

self
