// Variables can be defined inside of methods.

type Object = type {}

method run() -> Object {
  def x : Object = object {};
  x
}

self.run()
