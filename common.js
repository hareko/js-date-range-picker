/**
 * common functions/classes for datespan/datepick
 *
 * @package     Solution
 * @author      Vallo Reima
 * @copyright   (C)2013
 */

function $(id, obj)
  /*
   *  Get element by Id
   */
  {
    var o = (typeof obj === 'undefined') ? document : obj.document;
    return o.getElementById(id);
  }

function $$(obj, tag)
  /*
   *  Get elements by object tag name
   */
  {
    var o = (typeof obj === 'string') ? document.getElementById(obj) : obj;
    return o.getElementsByTagName(tag);
  }

function AttachEventListener(target, eventType, functionRef, capture)
  /*
   * Cross-browser method
   * in: target - element id
   *     eventType - click, ...
   *     functionRef - handler
   *     capture -- false - bubble (default)
   *                true - propagation
   */
  {
    if (typeof capture === 'undefined') {
      capture = false;
    }
    if (target.addEventListener) {
      target.addEventListener(eventType, functionRef, capture);
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, functionRef);
    } else {
      target['on' + eventType] = functionRef;
    }
  }

function DetachEventListener(target, eventType, functionRef, capture)
{
  if (typeof capture === 'undefined') {
    capture = false;
  }
  if (target.removeEventListener) {
    target.removeEventListener(eventType, functionRef, capture);
  } else if (target.detachEvent) {
    target.detachEvent('on' + eventType, functionRef);
  } else {
    target['on' + eventType] = null;
  }
}

function StopEvent(event, flag)
  /*
   * Prevent the Default Action for an Event
   * in: event - object
   *     flag -- true - don't cancel bubble
   */
  {
    var e = event ? event : window.event;
    e.returnValue = false;
    if (flag !== true) {
      e.cancelBubble = true;
      if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
    return false;
    /*
     oEvent.returnValue = false;
     if (oEvent.preventDefault) {
     oEvent.preventDefault();
     }
     */
  }

function Target(e)
{
  return (window.event) ? e.srcElement : e.target;
}

function EventType(event)
{
  var e = event || window.event;
  return e.type.toLowerCase();
}

function IsSet(variable)
  /*
   *  Check variable is set
   */
  {
    return (typeof variable !== 'undefined');
  }

function IsBlank(string)
  /*
   *  Check string blankness
   */
  {
    var blankRE = /^[\s]*$/;
    return blankRE.test(string);
  }

function IsArray(varMixed) {
  return (typeof varMixed === 'object') && (varMixed instanceof Array);
}

function ArraySearch(needle, haystack, argStrict) {
  // Searches the array for a given value and returns the corresponding key if successful
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
  // *     returns 1: 'surname'
  var strict = !!argStrict;
  var key = '';
  for (key in haystack) {
    if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
      return isNaN(Number(key)) ? key : parseInt(key);
    }
  }
  return false;
}

function Empty(varMixed)
  /*
   * Check empty variable
   */
  {
    if (typeof varMixed === 'object') {
      for (var i in varMixed) {
        return false;
      }
      return true;
    } else {
      return (varMixed === ""
        || varMixed === 0
        || varMixed === "0"
        || varMixed === null
        || varMixed === false
        || varMixed === undefined
        );
    }
  }

function Trim(string, flag)
  /*
   *  trim the string 
   *  flag: l -- left
   *        r -- right
   *          else both
   */
  {
    if (flag === undefined) {
      c = string.replace(/^\s+|\s+$/g, '');
    } else if (flag.toLowerCase() === 'l') {
      var c = string.replace(/^\s+/, '');
    } else if (flag.toLowerCase() === 'r') {
      c = string.replace(/\s+$/, '');
    }
    return c;
  }

function Pad(val, len, pad, dir)
  /**
   * 
   *  Javascript string pad
   *  http://www.webtoolkit.info/
   *
   *  This functions returns the input string padded on the left, the right,
   *  or both sides to the specified padding length. If the optional argument "pad"
   *  is not supplied, the input is padded with spaces, otherwise it is padded with
   *  characters from "pad" up to the "len" length.
   **/
  {
    var STR_PAD_LEFT = 1;
    var STR_PAD_RIGHT = 2;
    var STR_PAD_BOTH = 3;
    if (typeof(len) === "undefined") {
      len = 0;
    }
    if (typeof(pad) === "undefined") {
      pad = ' ';
    }
    if (typeof(dir) === "undefined") {
      dir = STR_PAD_RIGHT;
    }
    var str = val.toString();
    if (len + 1 >= str.length) {
      switch (dir) {
        case STR_PAD_LEFT:
          str = Array(len + 1 - str.length).join(pad) + str;
          break;
        case STR_PAD_BOTH:
          var right = Math.ceil((padlen = len - str.length) / 2);
          var left = padlen - right;
          str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
          break;
        default:
          str = str + Array(len + 1 - str.length).join(pad);
          break;
      } // switch
    }
    return str;
  }

function Width()
{
  return document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth :
    window.innerWidth != null ? window.innerWidth : document.body != null ? document.body.clientWidth : null;
}

function Height()
{
  return document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight :
    window.innerHeight != null ? window.innerHeight : document.body != null ? document.body.clientHeight : null;
}

function FindPos(obj)
  /* 
   * find object's real position
   * in: obj - element
   * out: left & top offsets
   */
  {
    var curleft = 0;
    var curtop = 0;
    if (obj.offsetParent) {
      var o = obj;
      do {
        curleft += o.offsetLeft;
        curtop += o.offsetTop;
        o = o.offsetParent;
      } while (o);
    }
    return [curleft, curtop];
  }

function FindParent(obj, val, trg)
  /* 
   * find object's parent
   * in:  obj - element object
   *      val - target value to find
   *      trg - target to find (tag,id,...)
   */
  {
    var r = null;
    var v = val.toLowerCase();
    var t = IsSet(trg) ? trg : 'tagName';
    var o = obj.parentNode;
    do {
      if (o[t].toLowerCase() === v) {
        r = o;
        break;
      }
      o = o.parentNode;
    } while (o.tagName);
    return r;
  }

Date.prototype.getWeek = function()
  /*
   * http://tech-hacks.net/tech/19/get-the-weeknumber-with-javascript/
   */
  {
    var determinedate = new Date();
    determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
    var D = determinedate.getDay();
    if (D == 0)
      D = 7;
    determinedate.setDate(determinedate.getDate() + (4 - D));
    var YN = determinedate.getFullYear();
    var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
    var WN = 1 + Math.floor(ZBDoCY / 7);
    return WN;
  };

function Forms(fid)
  /*
   *  form fields processing class
   *  in: fid - form id
   */
  {
    var fields = {};  /* field properties */
    var that = this;

    /* constructor */
    var dfe = $(fid).elements;
    for (var i = 0; i < dfe.length; i++) {
      var id = dfe[i].id;
      if (id) {
        fields[id] = {
          obj: dfe[i],
          tpe: dfe[i].type.toLowerCase(),
          err: '',
          val: dfe[i].value
        };
        var lbl = $('l_' + id);
        if (lbl) {
          fields[id].lbl = lbl;
        }
      }
    }

    that.Init = function(flds) {
      for (var id in flds) {
        if (fields[id]) {
          fields[id].fnc = flds[id];
          var evt = (fields[id].tpe === 'button' ? 'click' : 'change');
          AttachEventListener(fields[id].obj, evt, GetEvent);
          Enable(fields[id].obj, true);
        }
      }
    };

    that.Term = function() {
      for (var id in fields) {
        if (fields[id].fnc) {
          var evt = (fields[id].tpe === 'button' ? 'click' : 'change');
          DetachEventListener(fields[id].obj, evt, GetEvent);
          Enable(fields[id].obj, false);
        }
      }
    };

    that.Get = function(id) {
      return fields[id].val;
    };

    that.Set = function(id, val) {
      SetValue(id, val);
    };

    that.SetError = function(id, flg) {
      fields[id].err = flg ? flg : '';
      ErrFlag(id, flg);
    };

    var Enable = function(obj, flg)
      /*
       * enable/disable form element
       * in:  obj -- element object
       *      flg -- true - enable
       */
      {
        if (flg === true) {
          obj.removeAttribute('disabled');
          obj.disabled = false;
        } else {
          obj.setAttribute('disabled', 'disabled');
          obj.disabled = true;
        }
      };

    var GetEvent = function(event)
      /*
       * process field chage/click
       * in: event object
       */
      {
        var trg = Target(event);
        if (trg.tagName.toLowerCase() === 'img') {
          trg = trg.parentNode; /* Chrome, Safari */
        }
        var id = trg.id;
        if (fields[id].tpe !== 'button') {
          SetValue(id);
        }
        if (fields[id].lbl) {
          ErrFlag(id);
        }
        if (fields[id].fnc) {
          fields[id].fnc(id);
        }
        StopEvent(event);
      };

    var SetValue = function(id, val)
      /*
       * Setting field value
       * in: id - field id
       *      val - value (if not set, take from obj)
       */
      {
        if (fields[id].tpe.indexOf('select') + 1) {
          var c = IsSet(val) ? val : fields[id].obj.options[fields[id].obj.selectedIndex].value;
          var k = -1;
          fields[id].idx = -1;
          for (var i = 0; i < fields[id].obj.options.length; i++) {
            if (fields[id].obj.options[i].value === c) {
              fields[id].idx = i;
              fields[id].obj.options[i].setAttribute('selected', 'selected');
            } else if (fields[id].obj.options[i].value === fields[id].val) {
              fields[id].obj.options[i].removeAttribute('selected');
            }
            if (fields[id].obj.options[i].value === '') {
              k = i;
            }
          }
          if (fields[id].idx === -1) {
            c = '';
            fields[id].idx = k === -1 ? 0 : k;
          }
          fields[id].obj.selectedIndex = 0;  /* FF mess */
          fields[id].obj.selectedIndex = fields[id].idx;
          /* setTimeout(function(){
           fields[id].obj.selectedIndex = fields[id].idx;
           },100); */
          fields[id].val = c;
          fields[id].txt = fields[id].obj.options[fields[id].idx].text;
        } else if (fields[id].tpe !== 'button') {
          fields[id].val = Trim(IsSet(val) ? val + '' : fields[id].obj.value);
          if (IsBlank(fields[id].val)) {
            fields[id].val = '';
          }
          fields[id].obj.setAttribute('value', fields[id].val);
          fields[id].obj.value = fields[id].val;
        }
      };

    var ErrFlag = function(id, flg)
      /* set field error flag
       * in: id - field id
       *     flg -- empty - ok
       *            else error
       */
      {
        if (fields[id].lbl) {
          if (Empty(flg)) {
            fields[id].lbl.style.color = '';
          } else {
            fields[id].lbl.style.color = 'red';
          }
        }
      };
  }
