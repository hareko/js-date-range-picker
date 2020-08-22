<?php
/**
 * date-span-pick example
 *
 * @package     Solution
 * @author      Vallo Reima
 * @copyright   (C)2013
 */
date_default_timezone_set('UTC');
mb_internal_encoding('UTF-8');

$sets = array('dats' => '.dmyy', /* date format: delimiter and day,month,year sequence (yy - full year) */
    'wsuf' => false);           /* if true then week starts from Sunday */

$days = array('Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa');  /* day tokens */
$pers = array('cd' => 'today', /* period names */
    'pd' => 'yesterday',
    'nd' => 'tomorrow',
    'cw' => 'current week',
    'pw' => 'previous week',
    'cm' => 'current month',
    'pm' => 'previous month',
    'pmf' => 'from last month',
    'cy' => 'current year',
    'py' => 'previous year');
$months = array('0' => 'January', /* month names */
    '1' => 'February',
    '2' => 'March',
    '3' => 'April',
    '4' => 'May',
    '5' => 'June',
    '6' => 'July',
    '7' => 'August',
    '8' => 'September',
    '9' => 'October',
    '10' => 'November',
    '11' => 'December');
$years = array();
$k = date("Y") - 10;
$n = date("Y") + 10;
for ($i = $k; $i <= $n; $i++) { /* years +/- 10 from the current */
  $years[$i] = $i;
}
$txts = array('tit' => 'Date Range Picker', /* texts */
    'jsd' => 'JavaScript is disabled. Please enable and reload the page',
    'per' => 'Period',
    'frm' => 'Begin',
    'to' => 'End',
    'cal' => 'Calendar',
    'prm' => 'Previous month',
    'ntm' => 'Next month',
    'wrd' => 'Wrong date',
    'dtr' => 'Date range');
$txts['tnk'] = 'Thank You for trying ' . $txts['tit'];
$ical = 'calendar.png';

function Opts($opts)
/*
 * form select options
 * in: opts -- options array
 */ {
  $htm = '';
  foreach ($opts as $key => $val) {
    $htm .= '<option value="' . $key . '">' . $val . '</option>' . PHP_EOL;
  }
  return $htm;
}

function Days($days, $wsuf)
/*
 * form calendar daynames row
 * in:  days - day tokens  
 *      wsuf -- true - Sunday 1st
 */ {
  $a = array(1, 2, 3, 4, 5, 6);
  if ($wsuf) {
    array_unshift($a, 0);   /* Sunday 1st */
  } else {
    array_push($a, 0);    /* Monday 1st */
  }
  $htm = '<th>#</th>';
  foreach ($a as $i) {
    $htm .= '<th>' . $days[$i] . '</th>';
  }
  return $htm;
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title><?php echo $txts['tit']; ?></title>
    <link rel="stylesheet" href="datespck.css">
    <style type="text/css">
      html{
        font-size: 100%;
      }
      body {
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 1.0em;
        margin: 0;
        padding: 0;
        border:0;
        overflow: auto;
      }
      .wrapper{
        padding-top: 1em;
        width: 100%;
      }
      .head{
        text-align: center;
        margin-bottom: 1em;
      }
      .head noscript{
        color:red;
      }
      .foot{
        text-align: center;
      }
      .foot button{
        font-size: 0.7em;
        font-style: italic;
        margin: 1.5em 1em 0 1em;
      }
    </style>

    <script src="common.js" type="text/javascript"></script>
    <script src="datespan.js" type="text/javascript"></script>
    <script src="datepick.js" type="text/javascript"></script>

    <script type="text/javascript">

      var frm;  /* form object */
      var dsp;  /* datespan object */
      var err = '<?php echo $txts['wrd']; ?>';

      window.onload = function() {
        var sets = {dats: '<?php echo $sets['dats']; ?>',         /* date format */
          wsuf: <?php echo var_export($sets['wsuf'], true); ?>};  /* Sunday 1st flag */
        frm = new Forms('datespan');
        dsp = new DateSpan('datepick', sets);
        dsp.Init(frm);
        dsp.SetDate(); /* set today dates */
        $('wrapper').style.height = (Height() - 20) + 'px'; /* adjust full height */
      };

      function Command(cmd)
        /* example's command
         * cmd -- E - end
         *        G - go
         */
        {
          if (cmd === 'E') {
            frm.Term(); /* clear events and disable fields */
            $('head').innerHTML = '<?php echo $txts['tnk']; ?>';
            $('foot').innerHTML = '';
          } else if (dsp.CheckDates()) {
            var msg = '<?php echo $txts['dtr']; ?>: ' + frm.Get('datf') + '...' + frm.Get('datt');
            alert(msg); /* display in standard format */
          } else {
            alert(err);
          }
        }
    </script>
  </head>
  <body>
    <div id="wrapper" class="wrapper">
      <div id="head" class="head">
        <?php echo $txts['tit']; ?>
        <noscript>
        <br /><?php echo $txts['jsd']; ?>
        </noscript>
      </div>
      <form id="datespan">
        <input id="datf" type="hidden">
        <input id="datt" type="hidden">
        <table class="change">
          <tbody>
            <tr>
              <td><label for="dates" id="l_dates"><?php echo $txts['per']; ?></label>
              </td>
              <td>
                <select id="dates" disabled="disabled">
                  <?php echo Opts($pers); ?>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="datef" id="l_datef"><?php echo $txts['frm']; ?></label>
              </td>
              <td><input id="datef" size="10" maxlength="10" type="text" disabled="disabled">
                <button type="button" class="button-cmd" name="DP" id="dp_datef" title="<?php echo $txts['cal']; ?>" disabled="disabled"><img alt="" src="<?php echo $ical; ?>"></button>
              </td>
            </tr>
            <tr>
              <td><label for="datet" id="l_datet"><?php echo $txts['to']; ?></label>
              </td>
              <td><input id="datet" size="10" maxlength="10" type="text" disabled="disabled">
                <button type="button" class="button-cmd" name="DP" id="dp_datet" title="<?php echo $txts['cal']; ?>" disabled="disabled"><img alt="" src="<?php echo $ical; ?>"></button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div id="datepick" class="calendar datepick">
        <table class="change">
          <thead>
            <tr><th colspan="8"><button name="MP" title="<?php echo $txts['prm']; ?>">&lt;</button>
                <select name="month">
                  <?php echo Opts($months); ?>
                </select>
                <select name="year">
                  <?php echo Opts($years); ?>
                </select>
                <button name="MN" title="<?php echo $txts['ntm']; ?>">&gt;</button>
              </th></tr>
            <tr><?php echo Days($days, $sets['wsuf']); ?></tr>
          </thead>
          <tfoot>
            <tr><th colspan="8"></th></tr>
          </tfoot>
          <tbody>
          </tbody>
        </table>
      </div>

      <div class="foot" id="foot">
        <button class="button" type="button" onClick="Command('G');">Go</button>
        <button class="button" type="button" onClick="Command('E');">End</button>
      </div>
    </div>
  </body>
</html>
