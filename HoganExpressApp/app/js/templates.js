//		 }} Precompiled by Hoganizer {{
//		 }} Compiled templates are at the bottom {{

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

(function (Hogan, useArrayBuffer) {
  Hogan.Template = function (renderFunc, text, compiler, options) {
    this.r = renderFunc || this.r;
    this.c = compiler;
    this.options = options;
    this.text = text || '';
    this.buf = (useArrayBuffer) ? [] : '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // tries to find a partial in the curent scope and render it
    rp: function(name, context, partials, indent) {
      var partial = partials[name];

      if (!partial) {
        return '';
      }

      if (this.c && typeof partial == 'string') {
        partial = this.c.compile(partial, this.options);
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ls(val, ctx, partials, inverted, start, end, tags);
      }

      pass = (val === '') || !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        return ctx[ctx.length - 1];
      }

      for (var i = 1; i < names.length; i++) {
        if (val && typeof val == 'object' && names[i] in val) {
          cx = val;
          val = val[names[i]];
        } else {
          val = '';
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.lv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        if (v && typeof v == 'object' && key in v) {
          val = v[key];
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.lv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ho: function(val, cx, partials, text, tags) {
      var compiler = this.c;
      var options = this.options;
      options.delimiters = tags;
      var text = val.call(cx, text);
      text = (text == null) ? String(text) : text.toString();
      this.b(compiler.compile(text, options).render(cx, partials));
      return false;
    },

    // template result buffering
    b: (useArrayBuffer) ? function(s) { this.buf.push(s); } :
                          function(s) { this.buf += s; },
    fl: (useArrayBuffer) ? function() { var r = this.buf.join(''); this.buf = []; return r; } :
                           function() { var r = this.buf; this.buf = ''; return r; },

    // lambda replace section
    ls: function(val, ctx, partials, inverted, start, end, tags) {
      var cx = ctx[ctx.length - 1],
          t = null;

      if (!inverted && this.c && val.length > 0) {
        return this.ho(val, cx, partials, this.text.substring(start, end), tags);
      }

      t = val.call(cx);

      if (typeof t == 'function') {
        if (inverted) {
          return true;
        } else if (this.c) {
          return this.ho(t, cx, partials, this.text.substring(start, end), tags);
        }
      }

      return t;
    },

    // lambda replace variable
    lv: function(val, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = val.call(cx);

      if (typeof result == 'function') {
        result = coerceToString(result.call(cx));
        if (this.c && ~result.indexOf("{\u007B")) {
          return this.c.compile(result, this.options).render(cx, partials);
        }
      }

      return coerceToString(result);
    }

  };

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos =/\'/g,
      rQuot = /\"/g,
      hChars =/[&<>\"\']/;


  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp,'&amp;')
        .replace(rLt,'&lt;')
        .replace(rGt,'&gt;')
        .replace(rApos,'&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})(typeof exports !== 'undefined' ? exports : Hogan);
(function() {var templates = {};
templates.Home = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("This is the <em>");_.b(_.v(_.f("name",c,p,0)));_.b("</em> page. (Home.mustache)");_.b("\n");return _.fl();;});
templates.Messages = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("This is the <em>");_.b(_.v(_.f("name",c,p,0)));_.b("</em> page. (Messages.mustache)");_.b("\n");return _.fl();;});
templates.Profile = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div id=\"profilePage\" name=\"profileName\" class=\"panel panel-default\">");_.b("\n" + i);_.b("    <div class=\"panel-heading\">");_.b("\n" + i);_.b("        <h3 class=\"panel-title\">Profile</h3>");_.b("\n" + i);_.b("    </div>");_.b("\n" + i);_.b("    <div class=\"panel-body\">");_.b("\n" + i);_.b("        <form id=\"profileFormId\" name=\"profileFormName\">");_.b("\n" + i);_.b("            <table>");_.b("\n" + i);_.b("                <tr>");_.b("\n" + i);_.b("                <td>First name:</td><td><input type=\"text\" class=\"text\" name=\"firstname\" value=\"");_.b(_.v(_.f("firstName",c,p,0)));_.b("\"></td>");_.b("\n" + i);_.b("                </tr>");_.b("\n" + i);_.b("                <tr>");_.b("\n" + i);_.b("                <td>Last name:</td><td><input type=\"text\" class=\"text\" name=\"lastname\" value=\"");_.b(_.v(_.f("lastName",c,p,0)));_.b("\"></td>");_.b("\n" + i);_.b("                </tr>");_.b("\n" + i);_.b("                <tr>");_.b("\n" + i);_.b("                    <td>Phone:</td><td><input type=\"text\" class=\"text\" name=\"phone\" value=\"");_.b(_.v(_.f("phone",c,p,0)));_.b("\"></td>");_.b("\n" + i);_.b("                </tr>");_.b("\n" + i);_.b("                <tr>");_.b("\n" + i);_.b("                    <td>email:</td><td><input type=\"text\" class=\"text\" name=\"email\" value=\"");_.b(_.v(_.f("email",c,p,0)));_.b("\"></td>");_.b("\n" + i);_.b("                </tr>");_.b("\n" + i);_.b("                <tr></tr>");_.b("\n" + i);_.b("                <tr>");_.b("\n" + i);_.b("                    <td></td>");_.b("\n" + i);_.b("                    <td><input type=\"button\" class=\"btn pull-right\" id=\"saveButtonId\" name=\"saveButtonName\" value=\"save\"></td>");_.b("\n" + i);_.b("                </tr>");_.b("\n" + i);_.b("            </table>");_.b("\n" + i);_.b("        </form>");_.b("\n" + i);_.b("    </div>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n");return _.fl();;});
templates.ProfileModalEx = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div id=\"profilePage\" class=\"modal fade\">");_.b("\n" + i);_.b("    <div class=\"modal-dialog\">");_.b("\n" + i);_.b("        <div class=\"modal-content\">");_.b("\n" + i);_.b("            <div class=\"modal-header\">");_.b("\n" + i);_.b("                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>");_.b("\n" + i);_.b("                <h4 class=\"modal-title\">Profile</h4>");_.b("\n" + i);_.b("            </div>");_.b("\n" + i);_.b("            <div class=\"modal-body\">");_.b("\n" + i);_.b("                <form id=\"profileForm\">");_.b("\n" + i);_.b("                    <table>");_.b("\n" + i);_.b("                        <tr>");_.b("\n" + i);_.b("                            <td>Id</td><td></td><td><input type=\"text\" class=\"text\" name=\"id\" value=\"");_.b(_.v(_.f("_id",c,p,0)));_.b("\"></td>");_.b("\n" + i);_.b("                        </tr>");_.b("\n" + i);_.b("                        <tr>");_.b("\n" + i);_.b("                            <td>First name</td><td></td><td><input type=\"text\" class=\"text\" name=\"firstname\" value=\"");_.b(_.v(_.f("firstName",c,p,0)));_.b("\"></td>");_.b("\n" + i);_.b("                        </tr>");_.b("\n" + i);_.b("                        <tr>");_.b("\n" + i);_.b("                            <td>Last name</td><td></td><td><input type=\"text\" class=\"text\" name=\"lastname\" value=\"");_.b(_.v(_.f("lastName",c,p,0)));_.b("\"></td>");_.b("\n" + i);_.b("                        </tr>");_.b("\n" + i);_.b("                        <tr>");_.b("\n" + i);_.b("                            <td>Phone</td><td></td><td><input type=\"text\" class=\"text\" name=\"phone\" value=\"");_.b(_.v(_.f("phone",c,p,0)));_.b("\"></td>");_.b("\n" + i);_.b("                        </tr>");_.b("\n" + i);_.b("                        <tr>");_.b("\n" + i);_.b("                            <td>email</td><td></td><td><input type=\"text\" class=\"text\" name=\"email\" value=\"");_.b(_.v(_.f("email",c,p,0)));_.b("\"></td>");_.b("\n" + i);_.b("                        </tr>");_.b("\n" + i);_.b("                        <tr></tr>");_.b("\n" + i);_.b("                    </table>");_.b("\n" + i);_.b("                </form>");_.b("\n" + i);_.b("            </div>");_.b("\n" + i);_.b("            <div class=\"modal-footer\">");_.b("\n" + i);_.b("                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>");_.b("\n" + i);_.b("                <button id=\"btnSaveProfile\" type=\"button\" class=\"btn btn-primary\">Save changes</button>");_.b("\n" + i);_.b("            </div>");_.b("\n" + i);_.b("        </div><!-- /.modal-content -->");_.b("\n" + i);_.b("</div><!-- /.modal-dialog -->");_.b("\n" + i);_.b("</div><!-- /.modal -->");_.b("\n" + i);_.b("\n");return _.fl();;});
templates.Users = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<!-- This is the <em>");_.b(_.v(_.f("name",c,p,0)));_.b("</em> page. (Users.mustache) -->");_.b("\n" + i);_.b("\n" + i);_.b("<a id=\"createUser\" href=\"#\"");_.b("\n" + i);_.b("   data-toggle=\"modal\"");_.b("\n" + i);_.b("   data-target=\"#basicModal\">Create User</a>");_.b("\n" + i);_.b("\n" + i);_.b("<div class=\"panel panel-default\">");_.b("\n" + i);_.b("\n" + i);_.b("    <div class=\"panel-heading\">Panel heading</div>");_.b("\n" + i);_.b("\n" + i);_.b("    <table class=\"table\">");_.b("\n" + i);_.b("\n" + i);_.b("        <tr>");_.b("\n" + i);_.b("            <td><b>#</b></td>");_.b("\n" + i);_.b("            <td><b>First Name</b></td>");_.b("\n" + i);_.b("            <td><b>Last Name</b></td>");_.b("\n" + i);_.b("            <td><b>email</b></td>");_.b("\n" + i);_.b("        </tr>");_.b("\n" + i);_.b("\n" + i);if(_.s(_.f("users",c,p,1),c,p,0,457,940,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <tr>");_.b("\n" + i);_.b("            <td>");_.b("\n" + i);_.b("                <b>");_.b(_.v(_.f("@index",c,p,0)));_.b("</b>");_.b("\n" + i);_.b("            </td>");_.b("\n" + i);_.b("            <td>");_.b("\n" + i);_.b("                <b>");_.b(_.v(_.f("firstname",c,p,0)));_.b("</b>");_.b("\n" + i);_.b("            </td>");_.b("\n" + i);_.b("            <td>");_.b("\n" + i);_.b("                <b>");_.b(_.v(_.f("lastname",c,p,0)));_.b("</b>");_.b("\n" + i);_.b("            </td>");_.b("\n" + i);_.b("            <td>");_.b("\n" + i);_.b("                <b>");_.b(_.v(_.f("email",c,p,0)));_.b("</b>");_.b("\n" + i);_.b("            </td>");_.b("\n" + i);_.b("            <td><a href=\"#\" class=\"editUser\" data-user_db_id=\"");_.b(_.v(_.f("_id",c,p,0)));_.b("\">Edit</a></td>");_.b("\n" + i);_.b("            <td><a href=\"#\" class=\"delUser\" data-user_db_id=\"");_.b(_.v(_.f("_id",c,p,0)));_.b("\">Delete</a></td>");_.b("\n" + i);_.b("        </tr>");_.b("\n");});c.pop();}_.b("\n" + i);_.b("</table>");_.b("\n" + i);_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n" + i);_.b("<div id=\"ProfilePage\">");_.b("\n" + i);_.b("    <p></p>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n");return _.fl();;});
window.templates = templates})();