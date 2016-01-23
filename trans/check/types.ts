module types

imports
  src-gen/signatures/Graceless-sig

type rules

  TypeDecl(name, value) :-
    where definition of name : Interface(_)
     else error $[Recursive type in the declaration of [name]] on value

  Method(sig, _, result) : stype
    where sig : stype
      and stype => Signature(name, _, otype)
     else error "Failed to determine the method type" on sig
      and result : rtype
      and otype == rtype
     else error $[Incompatible type in method [name]:
                  expected [otype], got [rtype]] on result

  Object(methods) : Interface(msigs)
    where methods : msigs

  Request(receiver, name, args) : otype
    where definition of name : Signature(_, ptypes, otype)
     else error $[Failed to find [name] in the type of the receiver] on name
      and args : atypes
      and ptypes == atypes
     else error $[Incompatible types in request to [name]:
                  expected [ptypes], got [atypes]] on args

  Variable(name) : vtype
    where definition of name : vtype

  self@Self() : stype
    where definition of self : stype

  TypeRef(name) : ttype
    where definition of name : ttype

  Interface(sigs) : Interface(stypes)
    where sigs : stypes

  Signature(name, _, _) : stype
    where definition of name : stype

  Parameter(name, ptype) : ptype
    where definition of name : ptype
