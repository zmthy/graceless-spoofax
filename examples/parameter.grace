// Parameters should have their annotated type in the body of a method.

type Object = type {}

method identity(x : Object) -> Object {
  x
}

self
