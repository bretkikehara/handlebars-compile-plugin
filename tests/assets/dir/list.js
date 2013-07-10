function (context, options) {
    if (!compiled) {
      compiled = compile();
    }
    return compiled.call(this, context, options);
  }