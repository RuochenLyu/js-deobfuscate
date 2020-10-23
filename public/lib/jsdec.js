function autoscan(jsf) {
  function checklist(f) {
    if (
      f.indexOf(',') != -1
      && f.indexOf('=') != -1
      && f.indexOf('[') != -1
      && f.indexOf(']') != -1
      && f.indexOf('var ') != -1
    ) {
      return true;
    }
  }
  if (jsf.indexOf("['sojson.v4']") != -1) {
    return decsojson4(jsf);
  }
  if (jsf.indexOf("var __encode ='sojson.com") != -1) {
    return decsojsonp(jsf);
  }
  if (jsf.indexOf("var encode_version = 'sojson.v5',") != -1) {
    return dec_sojsonv5_default(jsf);
  }
  if (jsf.indexOf("'jsjiami.com'") != -1) {
    return obdec_default(jsf);
  }
  if (jsf.indexOf("'];(function(_0x") != -1) {
    return obdec_default(jsf);
  }
  if (checklist(jsf.substring(0, jsf.indexOf(';')))) {
    return dec_list(jsf);
  }
  if (
    jsf
      .substring(0, 100)
      .replace(/ /g, '')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/\[/g, '')
      .replace(/\]/g, '')
      .replace(/\+/g, '')
      .replace(/!/g, '') == ''
  ) {
    return decjsf(jsf);
  }
  if (jsf.substring(0, 50).indexOf('eval') != -1) {
    return uneval(jsf);
  }
  let jstmp = aadecode(jsf);
  if (jstmp != 'Failed!\nGiven code is not encoded as aaencode.') {
    return jstmp;
  }
  jstmp = jjdecode(jsf);
  if (jstmp != 'Failed!\nGiven code is not encoded as jjencode.') {
    return jstmp;
  }
  return 'Failed!\nAuto-Scan Failed.';
}

function uneval(jsf) {
  const s = jsf.indexOf('eval');
  const f = jsf.lastIndexOf(')');
  eval(`jsf=String${jsf.substring(s + 4, f + 1)}`);
  return jsf;
}

function decsojson4(jsf) {
  const head = "['sojson.v4']";
  if (jsf.indexOf(head) == -1) {
    return 'Failed!\nGiven code is not encoded as Sojson v4.';
  }
  args = jsf.substring(240, jsf.length - 58).split(/[a-zA-Z]{1,}/);
  let str = '';
  for (let i = 0; i < args.length; i++) {
    str += String.fromCharCode(args[i]);
  }
  return str;
}

function obdec_default(jsf, thr1 = false, throwederror = '') {
  const ojs = jsf;
  let spljs;
  try {
    function sandbox() {
      function th() {
        if (head2.indexOf(head1) == -1) return;
        let countn;
        const c = head2.substring(head2.indexOf(head1), head2.length);
        let jstmp = c.substring(0, c.indexOf("')") + 2);
        try {
          countn = eval(jstmp);
        } catch (e) {
          const jstmp2 = c.substring(c.indexOf("')") + 2, c.length);
          jstmp += jstmp2.substring(0, jstmp2.indexOf("')") + 2);
          countn = eval(jstmp);
        }
        head2 = head2.replace(
          jstmp,
          `'${countn.replace(/\n/g, '\\n').replace(/'/g, "\\'")}'`,
        );
        th();
      }
      eval(head3);
      th();
    }
    if (jsf.indexOf('));var') != -1) {
      var indf = jsf.indexOf('));var');
      spljs = '));var';
    } else if (jsf.indexOf(')); var') != -1) {
      var indf = jsf.indexOf(')); var');
      spljs = ')); var';
    } else if (jsf.indexOf('));\nvar') != -1) {
      var indf = jsf.indexOf('));\nvar');
      spljs = '));\nvar';
    } else {
      throw 'Cannot Found function.';
    }
    let head1;
    var head2 = jsf.substring(indf + 3, jsf.length);
    var head3 = head2.substring(head2.indexOf(')') + 1, head2.length).split('');
    let c = 0;
    let pos;
    let ch = -1;
    for (let i = 0; i < head3.length; i++) {
      if (head3[i] == '{') {
        c++;
        if (ch == -1) {
          ch = 0;
        }
      } else if (head3[i] == '}') {
        c--;
      }
      if (c == 0 && ch == 0) {
        ch = 1;
        pos = i;
      }
    }
    head1 = head2.substring(4, head2.indexOf('=')).replace(/ /g, '');
    head3 = jsf.substring(0, pos + head2.indexOf(')') + 6 + indf);
    head2 = jsf.substring(pos + head2.indexOf(')') + 6 + indf, jsf.length);
    sandbox(head2);
    return head2;
  } catch (e) {
    if (thr1 == false) {
      return obdec_default(ojs.replace(spljs, '));\tvar'), true, e);
    }
    return `Failed!\nthrowed1:${throwederror}\nthrowed2:${e}`;
  }
}

function dec_sojsonv5_default(jsf) {
  if (jsf.indexOf("sojson.v5',") == -1) {
    return 'Failed\nNot Encoded as sojson.v5';
  }
  jsf = jsf.substring(jsf.indexOf("sojson.v5',") + 12, jsf.length);
  jsf = `var ${jsf.substring(jsf.indexOf(',   ') + 2, jsf.length)}`;
  const js = obdec_default(jsf);
  return js.substring(0, js.indexOf('(function(_0x'));
}

function dec_list(jsf) {
  if (
    !(
      jsf.indexOf(',') != -1
      && jsf.indexOf('=') != -1
      && jsf.indexOf('[') != -1
      && jsf.indexOf(']') != -1
      && jsf.indexOf('var ') != -1
    )
  ) {
    throw 'Type Error!';
  }
  let result;
  let name;

  function th() {
    const s = result.split('');
    if (result.indexOf(name) == -1) {
    } else {
      const c = result.substring(result.indexOf(name), result.length);
      const jstmp = c.substring(0, c.indexOf(']') + 1);
      const countn = eval(jstmp);
      result = result.replace(
        jstmp,
        `'${countn.replace(/\n/g, '\\n').replace(/'/g, "\\'")}'`,
      );
      th();
    }
  }
  name = jsf.substring(4, jsf.indexOf('='));
  eval(jsf.substring(0, jsf.indexOf(';') + 1));
  result = jsf.substring(jsf.indexOf(';') + 1, jsf.length);
  th();
  return result;
}

function decsojsonp(jsf) {
  if (jsf.indexOf("var __encode ='sojson.com") == -1) {
    return 'Failed!\nGiven code is not encoded as Sojson Primium.';
  }
  jsf = jsf.substring(
    jsf.indexOf(');var _') + 2,
    jsf.lastIndexOf('(function(_0x'),
  );
  return dec_list(jsf);
}

function aadecode(text) {
  const evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
  const decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
  const evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
  const decodePostamble = ') ());';
  text = text.replace(/^\s*/, '').replace(/\s*$/, '');
  if (/^\s*$/.test(text)) {
    return '';
  }
  if (text.lastIndexOf(evalPreamble) < 0) {
    return 'Failed!\nGiven code is not encoded as aaencode.';
  }
  if (text.lastIndexOf(evalPostamble) != text.length - evalPostamble.length) {
    return 'Failed!\nGiven code is not encoded as aaencode.';
  }
  const decodingScript = text
    .replace(evalPreamble, decodePreamble)
    .replace(evalPostamble, decodePostamble);
  return eval(decodingScript);
}

function jjdecode(t) {
  let jjvalue = '';
  t.replace(/^\s+|\s+$/g, '');
  let startpos;
  let endpos;
  let gv;
  let gvl;
  if (t.indexOf('"\'\\"+\'+",') == 0) {
    startpos = t.indexOf('$$+"\\""+') + 8;
    endpos = t.indexOf('"\\"")())()');
    gv = t.substring(t.indexOf('"\'\\"+\'+",') + 9, t.indexOf('=~[]'));
    gvl = gv.length;
  } else {
    gv = t.substr(0, t.indexOf('='));
    gvl = gv.length;
    startpos = t.indexOf('"\\""+') + 5;
    endpos = t.indexOf('"\\"")())()');
  }
  if (startpos == endpos) {
    alert('No data !');
    return;
  }
  let data = t.substring(startpos, endpos);
  const b = [
    '___+',
    '__$+',
    '_$_+',
    '_$$+',
    '$__+',
    '$_$+',
    '$$_+',
    '$$$+',
    '$___+',
    '$__$+',
    '$_$_+',
    '$_$$+',
    '$$__+',
    '$$_$+',
    '$$$_+',
    '$$$$+',
  ];
  const str_l = `(![]+"")[${gv}._$_]+`;
  const str_o = `${gv}._$+`;
  const str_t = `${gv}.__+`;
  const str_u = `${gv}._+`;
  const str_hex = `${gv}.`;
  const str_s = '"';
  const gvsig = `${gv}.`;
  const str_quote = '\\\\\\"';
  const str_slash = '\\\\\\\\';
  const str_lower = '\\\\"+';
  const str_upper = `\\\\"+${gv}._+`;
  const str_end = '"+';
  while (data != '') {
    if (data.indexOf(str_l) == 0) {
      data = data.substr(str_l.length);
      jjvalue += 'l';
      continue;
    } else if (data.indexOf(str_o) == 0) {
      data = data.substr(str_o.length);
      jjvalue += 'o';
      continue;
    } else if (data.indexOf(str_t) == 0) {
      data = data.substr(str_t.length);
      jjvalue += 't';
      continue;
    } else if (data.indexOf(str_u) == 0) {
      data = data.substr(str_u.length);
      jjvalue += 'u';
      continue;
    }
    if (data.indexOf(str_hex) == 0) {
      data = data.substr(str_hex.length);
      var i = 0;
      for (i = 0; i < b.length; i++) {
        if (data.indexOf(b[i]) == 0) {
          data = data.substr(b[i].length);
          jjvalue += i.toString(16);
          break;
        }
      }
      continue;
    }
    if (data.indexOf(str_s) == 0) {
      data = data.substr(str_s.length);
      if (data.indexOf(str_upper) == 0) {
        data = data.substr(str_upper.length);
        var ch_str = '';
        for (j = 0; j < 2; j++) {
          if (data.indexOf(gvsig) == 0) {
            data = data.substr(gvsig.length);
            for (k = 0; k < b.length; k++) {
              if (data.indexOf(b[k]) == 0) {
                data = data.substr(b[k].length);
                ch_str += `${k.toString(16)}`;
                break;
              }
            }
          } else {
            break;
          }
        }
        jjvalue += String.fromCharCode(parseInt(ch_str, 16));
        continue;
      } else if (data.indexOf(str_lower) == 0) {
        data = data.substr(str_lower.length);
        var ch_str = '';
        var ch_lotux = '';
        var temp = '';
        var b_checkR1 = 0;
        for (j = 0; j < 3; j++) {
          if (j > 1) {
            if (data.indexOf(str_l) == 0) {
              data = data.substr(str_l.length);
              ch_lotux = 'l';
              break;
            } else if (data.indexOf(str_o) == 0) {
              data = data.substr(str_o.length);
              ch_lotux = 'o';
              break;
            } else if (data.indexOf(str_t) == 0) {
              data = data.substr(str_t.length);
              ch_lotux = 't';
              break;
            } else if (data.indexOf(str_u) == 0) {
              data = data.substr(str_u.length);
              ch_lotux = 'u';
              break;
            }
          }
          if (data.indexOf(gvsig) == 0) {
            temp = data.substr(gvsig.length);
            for (k = 0; k < 8; k++) {
              if (temp.indexOf(b[k]) == 0) {
                if (parseInt(`${ch_str + k}`, 8) > 128) {
                  b_checkR1 = 1;
                  break;
                }
                ch_str += `${k}`;
                data = data.substr(gvsig.length);
                data = data.substr(b[k].length);
                break;
              }
            }
            if (b_checkR1 == 1) {
              if (data.indexOf(str_hex) == 0) {
                data = data.substr(str_hex.length);
                var i = 0;
                for (i = 0; i < b.length; i++) {
                  if (data.indexOf(b[i]) == 0) {
                    data = data.substr(b[i].length);
                    ch_lotux = i.toString(16);
                    break;
                  }
                }
                break;
              }
            }
          } else {
            break;
          }
        }
        jjvalue += String.fromCharCode(parseInt(ch_str, 8)) + ch_lotux;
        continue;
      } else {
        let match = 0;
        var n;
        while (true) {
          n = data.charCodeAt(0);
          if (data.indexOf(str_quote) == 0) {
            data = data.substr(str_quote.length);
            jjvalue += '"';
            match += 1;
            continue;
          } else if (data.indexOf(str_slash) == 0) {
            data = data.substr(str_slash.length);
            jjvalue += '\\';
            match += 1;
            continue;
          } else if (data.indexOf(str_end) == 0) {
            if (match == 0) {
              alert(`+ no match S block: ${data}`);
              return;
            }
            data = data.substr(str_end.length);
            break;
          } else if (data.indexOf(str_upper) == 0) {
            if (match == 0) {
              alert(`no match S block n>128: ${data}`);
              return;
            }
            data = data.substr(str_upper.length);
            var ch_str = '';
            var ch_lotux = '';
            for (j = 0; j < 10; j++) {
              if (j > 1) {
                if (data.indexOf(str_l) == 0) {
                  data = data.substr(str_l.length);
                  ch_lotux = 'l';
                  break;
                } else if (data.indexOf(str_o) == 0) {
                  data = data.substr(str_o.length);
                  ch_lotux = 'o';
                  break;
                } else if (data.indexOf(str_t) == 0) {
                  data = data.substr(str_t.length);
                  ch_lotux = 't';
                  break;
                } else if (data.indexOf(str_u) == 0) {
                  data = data.substr(str_u.length);
                  ch_lotux = 'u';
                  break;
                }
              }
              if (data.indexOf(gvsig) == 0) {
                data = data.substr(gvsig.length);
                for (k = 0; k < b.length; k++) {
                  if (data.indexOf(b[k]) == 0) {
                    data = data.substr(b[k].length);
                    ch_str += `${k.toString(16)}`;
                    break;
                  }
                }
              } else {
                break;
              }
            }
            jjvalue += String.fromCharCode(parseInt(ch_str, 16));
            break;
          } else if (data.indexOf(str_lower) == 0) {
            if (match == 0) {
              alert(`no match S block n<128: ${data}`);
              return;
            }
            data = data.substr(str_lower.length);
            var ch_str = '';
            var ch_lotux = '';
            var temp = '';
            var b_checkR1 = 0;
            for (j = 0; j < 3; j++) {
              if (j > 1) {
                if (data.indexOf(str_l) == 0) {
                  data = data.substr(str_l.length);
                  ch_lotux = 'l';
                  break;
                } else if (data.indexOf(str_o) == 0) {
                  data = data.substr(str_o.length);
                  ch_lotux = 'o';
                  break;
                } else if (data.indexOf(str_t) == 0) {
                  data = data.substr(str_t.length);
                  ch_lotux = 't';
                  break;
                } else if (data.indexOf(str_u) == 0) {
                  data = data.substr(str_u.length);
                  ch_lotux = 'u';
                  break;
                }
              }
              if (data.indexOf(gvsig) == 0) {
                temp = data.substr(gvsig.length);
                for (k = 0; k < 8; k++) {
                  if (temp.indexOf(b[k]) == 0) {
                    if (parseInt(`${ch_str + k}`, 8) > 128) {
                      b_checkR1 = 1;
                      break;
                    }
                    ch_str += `${k}`;
                    data = data.substr(gvsig.length);
                    data = data.substr(b[k].length);
                    break;
                  }
                }
                if (b_checkR1 == 1) {
                  if (data.indexOf(str_hex) == 0) {
                    data = data.substr(str_hex.length);
                    var i = 0;
                    for (i = 0; i < b.length; i++) {
                      if (data.indexOf(b[i]) == 0) {
                        data = data.substr(b[i].length);
                        ch_lotux = i.toString(16);
                        break;
                      }
                    }
                  }
                }
              } else {
                break;
              }
            }
            jjvalue += String.fromCharCode(parseInt(ch_str, 8)) + ch_lotux;
            break;
          } else if (
            (n >= 0x21 && n <= 0x2f)
            || (n >= 0x3a && n <= 0x40)
            || (n >= 0x5b && n <= 0x60)
            || (n >= 0x7b && n <= 0x7f)
          ) {
            jjvalue += data.charAt(0);
            data = data.substr(1);
            match += 1;
          }
        }
        continue;
      }
    }
    break;
  }
  if (jjvalue != '') {
    return jjvalue;
  }
  return 'Failed!\nGiven code is not encoded as jjencode.';
}

function decjsf(js) {
  function patternCreator(prefix, postfix) {
    replacedPrefix = prefix.replace(/[\[\]\(\)\+\!]/g, '\\$&');
    replacedPostfix = postfix.replace(/[\[\]\(\)\+\!]/g, '\\$&');
    return `${replacedPrefix}(.*)${replacedPostfix}`;
  }

  function isMatching(string, pattern) {
    const result = string.match(new RegExp(pattern));
    if (result) return result[1];
    return null;
  }

  function decodejsf() {
    let prefix = '[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(![]+[])[!+[]+!+[]]][([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(+[![]]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+!+[]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(+![]+([]+[])[([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(+![]+[![]]+([]+[])[([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]])[!+[]+!+[]+[+[]]]](!+[]+!+[]+!+[]+[!+[]+!+[]])+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]])()(';
    let postfix = ')';
    let result = isMatching(code, patternCreator(prefix, postfix));
    if (result) {
      code = eval(result);
      return;
    }
    prefix = '[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(![]+[])[!+[]+!+[]]][([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]](';
    postfix = ')()';
    result = isMatching(code, patternCreator(prefix, postfix));
    if (result) {
      code = eval(result);
      return;
    }
    prefix = '[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]][([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]](';
    postfix = ')()';
    result = isMatching(code, patternCreator(prefix, postfix));
    if (result) {
      code = eval(result);
      return;
    }
    code = eval(code);
  }
  try {
    var code = js;
    decodejsf();
    return code;
  } catch (e) {
    return `Failed\n${e}`;
  }
}
