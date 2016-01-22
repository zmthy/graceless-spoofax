module types

imports
  src-gen/signatures/Graceless-sig

type rules

  TypeDecl(name, sigs) :-
    where definition of name : Type(_)
     else error $[Recursive type in the declaration of [name]] on sigs

  Method(sig, _, result) : stype
    where sig : stype
      and stype => Signature(_, otype)
     else error "Failed to determine the method type" on sig
      and result : rtype
      and otype == rtype
     else error $[Incompatible type: expected [otype], got [rtype]] on result

  Object(methods) : Type(msigs)
    where methods : msigs

  Request(receiver, name, args) : otype
    where definition of name : Signature(ptypes, otype)
      and args : atypes
      and ptypes == atypes
     else error $[Incompatible types: expected [ptypes], got [atypes]] on args

  Variable(name) : vtype
    where definition of name : vtype

  TypeRef(name) : ttype
    where definition of name : ttype

  Interface(sigs) : Type(stypes)
    where sigs : stypes

  Signature(name, _, _) : stype
    where definition of name : stype

  Parameter(name, ptype) : ptype
    where definition of name : ptype
