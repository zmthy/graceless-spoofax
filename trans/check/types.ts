module check/types

imports
  src-gen/signatures/Graceless-sig

type rules

  TypeDecl(name, value) :-
    where definition of name : Interface(_)
     else error $[Recursive type in the declaration of [name]] on value

  Body(_, result) : rtype
    where result : rtype

  Method(sig, result) : stype
    where sig : stype
      and stype => Signature(name, _, otype)
     else error "Failed to determine the method type" on sig
      and result : rtype
      and otype == rtype
     else error $[Incompatible type in method [name]:
                  expected [otype], got [rtype]] on result

  Def(name, dtype, expr) :-
    where dtype : dtype'
      and expr : etype
      and dtype' == etype
     else error $[Incompatible type in def [name]:
                  expected [dtype'], got [etype]] on expr

  Var(name, vtype, expr) :-
    where vtype : vtype'
      and expr : etype
      and vtype' == etype
     else error $[Incompatible type in var [name]:
                  expected [vtype'], got [etype]] on expr

  Assign(name, expr) :-
    where definition of name : VariableType(vtype, kind)
      and expr : etype
      and vtype == etype
     else error $[Incompatible type in assignment to [name]:
                  expected [vtype], got [etype]] on expr
      and kind == Var()
     else error $[Invalid assignment to constant def [name]] on name

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
    where definition of name : VariableType(vtype, _)

  self@Self() : stype
    where definition of self : stype

  TypeRef(name) : ttype
    where definition of name : ttype

  Interface(sigs) : Interface(stypes)
    where sigs : stypes

  Signature(name, params, otype) : Signature(name, ptypes, otype')
    where params : ptypes
      and otype : otype'

  Parameter(name, ptype) : ptype'
    where ptype : ptype'
