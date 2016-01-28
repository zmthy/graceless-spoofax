// Assignments cannot be done on defs.

type Object = type {}

method run() -> Object {
  def x : Object = object {};
  x := object {};
  x
}

self.run()
