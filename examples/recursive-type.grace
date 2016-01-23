// A recursive type definition.

type Recursive = type {
  loop() -> Recursive
}

self
