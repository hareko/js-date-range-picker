/**
 * datespan class
 *
 * @package     Application
 * @author      Vallo Reima
 * @copyright   (C)2012
 */

function DateSpan(fid, set)
  /*
   *  in: fid - datepick form id
   *      set - settings (dats, wsuf)
   */
  {
    var frm;  /* form object */
    var dpr;  /* date picker object */
    var that = this;

    that.Init = function(obj) {
  /*
   *  in: obj - form fields object
   */
      frm = obj;
      frm.Init({
        dates: that.SetDate,
        datef: CheckDate,
        datet: CheckDate,
        dp_datef: PickDate,
        dp_datet: PickDate
      });
    };

    var CheckDate = function(id)
      /*
       * check the date correctness
       * in:  id -- date id
       */
      {
        if (!ShortDate(frm.Get(id))) {
          frm.SetError(id, err);
        }
      };

    var PickDate = function(pid)
      /*
       * check the date correctness
       * in:  pid -- pickup id
       *              empty - clear
       */
      {
        var id = pid.split('_')[1];
        dpr = new DatePick(id, set.wsuf, PickedDate);
        dpr.Init(fid, ShortDate(frm.Get(id)));
      };

    var PickedDate = function(dat, id)
      /*
       * check the date correctness
       * in:  dat -- array - date picked
       *              false - cancelled
       */
      {
        if (dat) {
          frm.Set(id, ShortDate(dat));
          frm.SetError(id);
        }
        dpr = null;
      }
    ;

    that.CheckDates = function()
      /*
       * check the dates correctness; save standard format
       */
      {
        var fd = ShortDate(frm.Get('datef'));
        var td = ShortDate(frm.Get('datet'));
        if (fd && td) {
          if (fd > td) {
            td = false;
            frm.SetError('datet', err);
          } else {
            var f = '-yymd';
            frm.Set('datf', ShortDate(fd, f));
            frm.Set('datt', ShortDate(td, f));
            frm.SetError('datet');
          }
        }
        return (fd && td);
      };

    that.SetDate = function()
      /*
       * set the date range
       * in:  id -- selection id
       */
      {
        var a = GetDateRange(frm.Get('dates'));
        frm.Set('datef', ShortDate(a[0]));
        frm.Set('datet', ShortDate(a[1]));
        frm.SetError('datef');
        frm.SetError('datet');
      };

    var GetDateRange = function(id)
      /*
       * get the date range from current date
       * in:  id -- range id
       * out: date objects [from,to]
       */
      {
        var f = new Date();
        var t = new Date();
        switch (id) {
          case 'cd':
            break;
          case 'pd':
            f.setDate(f.getDate() - 1);
            t = f;
            break;
          case 'nd':
            f.setDate(f.getDate() + 1);
            t = f;
            break;
          case 'cw':
            f = GetMonday(f);
            t = GetMonday(t);
            t.setDate(t.getDate() + 6);
            break;
          case 'pw':
            f.setDate(f.getDate() - 7);
            f = GetMonday(f);
            t.setDate(t.getDate() - 7);
            t = GetMonday(t);
            t.setDate(t.getDate() + 6);
            break;
          case 'cm':
            f.setDate(1);
            t.setDate(DaysInMonth(t));
            break;
          case 'pm':
            f.setMonth(f.getMonth() - 1);
            f.setDate(1);
            t.setMonth(t.getMonth() - 1);
            t.setDate(DaysInMonth(t));
            break;
          case 'pmf':
            f.setMonth(f.getMonth() - 1);
            f.setDate(1);
            break;
          case 'cy':
            f.setFullYear(f.getFullYear(), 0, 1);
            t.setFullYear(t.getFullYear(), 11, 31);
            break;
          case 'py':
            f.setFullYear(f.getFullYear() - 1, 0, 1);
            t.setFullYear(t.getFullYear() - 1, 11, 31);
            break;
        }
        return [f, t];
      };

    var DaysInMonth = function(date)
      /*
       * get number of days in month
       * in:  date -- any date in the month - object
       */
      {
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        var d = new Date(y, m, 0);
        return d.getDate();
      };

    var GetMonday = function(date)
      /*
       * get the first day of the week
       * in:  date -- any date in the month - object
       */
      {
        var day = date.getDay();
        var diff = date.getDate() - day + (day === 0 ? -6 : 1); /* adjust when day is sunday */
        return new Date(date.setDate(diff));
      };

    function ShortDate(date, dats)
      /*
       * check/form short date according to a pattern
       * in: date -- string -- check date
       *             array - [day,month,year] strings '01' '12' '2011'
       *              else date object
       *     dats -- date format
       *              not set - default
       */
      {
        var fmts = {
          dmy: 'dd#mm#yy',
          dmyy: 'dd#mm#yyyy',
          ymd: 'yy#mm#dd',
          yymd: 'yyyy#mm#dd'
        };
        if (!IsSet(dats)) {
          dats = set.dats;
        }
        var fmt = dats.substr(1);
        var dlr = dats.substr(0, 1);
        dats = fmts[fmt].replace(/#/g, dlr);
        if (typeof date === 'string') {
          var d = [];
          d[0] = Number(date.substr(dats.indexOf('dd'), 2));
          d[1] = Number(date.substr(dats.indexOf('mm'), 2)) - 1;
          if (dats.indexOf('yyyy') + 1) {
            var c = date.substr(dats.indexOf('yyyy'), 4);
            if (c.length === 4) {
              d[2] = Number(c);
            } else {
              d[2] = 0;
            }
          } else {
            d[2] = Number('20' + date.substr(dats.indexOf('yy'), 2));
          }
          var dat = new Date(d[2], d[1], d[0]);
          if (d[2] !== dat.getFullYear() || d[1] !== dat.getMonth() || d[0] !== dat.getDate()) {
            dat = null;
          }
        } else {
          if (IsArray(date)) {
            d = date;
          } else {
            d = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
          }
          d[0] = Pad(d[0], 2, '0', 1);
          d[1] = Pad(d[1], 2, '0', 1);
          d[2] = String(d[2]);
          dat = dats.replace('dd', d[0]).replace('mm', d[1]);
          if (dats.indexOf('yyyy') + 1) {
            dat = dat.replace('yyyy', d[2]);
          } else {
            dat = dat.replace('yy', d[2].substr(2));
          }
        }
        return dat;
      }
  }
