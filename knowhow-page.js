/* Valley Know-How: renders the list page and the feature pages from knowhow.js */
(function(){
const S = window.OVE_SITE || {}, el = S.el, K = (window.OVE_KNOWHOW || {}).features || [];
const today = new Date(); today.setHours(0,0,0,0);
const day = d => { const [y,m,dd] = (d||"").split("-").map(Number); return y ? new Date(y, m-1, dd) : null; };
const nice = d => { const x = day(d); return x ? x.toLocaleDateString("en-US", {weekday:"long", month:"long", day:"numeric"}) : ""; };
const isLink = s => /^https?:/.test(s || "");
const signup = c => c.signup ? (isLink(c.signup) ? el("a", {class:"btn primary", href:c.signup, target:"_blank", rel:"noopener", "data-track":"know-how sign up: " + (c.who||""), text:"Sign up with the teacher"}) : el("p", {}, [el("b", {text:"To sign up: "}), document.createTextNode(c.signup)])) : null;
function classCard(c, f){
  c.who = f.teacher;
  return el("article", {class:"card"}, [
    el("p", {class:"eyebrow", text: nice(c.date) + (c.time ? " · " + c.time : "")}),
    el("h3", {}, [el("a", {href:"know-how-feature.html?id=" + encodeURIComponent(f.id), text: f.skill})]),
    el("div", {class:"meta", text: "With " + f.teacher + (f.business ? ", " + f.business : "")}),
    c.place ? el("div", {class:"meta", text: "Where: " + c.place}) : null,
    el("div", {class:"meta", text: [c.cost ? "Cost: " + c.cost : "", c.spots || ""].filter(Boolean).join(" · ")}),
    signup(c) ]);
}
const upcoming = () => K.flatMap(f => (f.classes||[]).filter(c => { const d = day(c.date); return d && d >= today; }).map(c => [c, f])).sort((a,b) => day(a[0].date) - day(b[0].date));

/* list page */
const up = document.getElementById("kh-up"), feats = document.getElementById("kh-feats");
if (up) {
  const u = upcoming();
  if (u.length) { const g = el("div", {class:"grid"}); u.forEach(([c,f]) => g.append(classCard(c,f))); up.replaceChildren(g); }
  else up.replaceChildren(el("div", {class:"empty"}, [el("p", {text:"Our first class is coming soon: home canning, taught by a USU Extension–certified food preserver. Check back, or follow us on Facebook to hear first."})]));
}
if (feats) {
  if (!K.length) feats.replaceChildren(el("div", {class:"empty"}, [el("p", {text:"Teacher features will show here. Each one tells the teacher's story and how to find their business."})]));
  else { const g = el("div", {class:"grid"}); K.slice().sort((a,b)=>a.skill.localeCompare(b.skill)).forEach(f => g.append(el("article", {class:"card"}, [
    f.photo ? el("img", {src:f.photo, alt:f.skill + " with " + f.teacher, loading:"lazy", style:"width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px"}) : null,
    el("p", {class:"eyebrow", text:f.skill}), el("h3", {text:f.teacher + (f.business ? " · " + f.business : "")}),
    f.summary ? el("p", {text:f.summary}) : null,
    el("a", {href:"know-how-feature.html?id=" + encodeURIComponent(f.id), text:"Read the feature"}) ]))); feats.replaceChildren(g); }
}

/* feature page */
const box = document.getElementById("kh-feature");
if (box) {
  const id = new URLSearchParams(location.search).get("id"), f = K.find(x => x.id === id);
  if (!f) { box.replaceChildren(el("div", {class:"empty"}, [el("p", {text:"We couldn't find that feature. "}), el("a", {href:"know-how.html", text:"See all Valley Know-How classes"})])); return; }
  document.title = f.skill + " with " + f.teacher + " · Valley Know-How";
  document.getElementById("kh-h1").textContent = f.skill;
  document.getElementById("kh-lead").textContent = "With " + f.teacher + (f.business ? " of " + f.business : "") + (f.town ? ", " + f.town : "");
  const cls = (f.classes||[]).filter(c => { const d = day(c.date); return d && d >= today; });
  box.replaceChildren(
    f.credential ? el("p", {class:"fair"}, [el("b", {text:"Credentials: "}), document.createTextNode(f.credential)]) : null,
    f.photo ? el("img", {src:f.photo, alt:f.skill + " with " + f.teacher, style:"width:100%;max-width:760px;border-radius:14px;margin-bottom:14px"}) : null,
    el("div", {class:"card", style:"max-width:760px"}, [el("p", {class:"eyebrow", text:"Meet your teacher"}), el("h2", {text:f.teacher})].concat((f.story||[]).map(t => el("p", {text:t})))),
    (f.tips && f.tips.length) ? el("div", {class:"card", style:"max-width:760px;margin-top:14px"}, [el("p", {class:"eyebrow", text:"Beginner tips"}), el("ul", {class:"perks"}, f.tips.map(t => el("li", {text:t})))]) : null,
    f.safety ? el("div", {class:"card feature", style:"max-width:760px;margin-top:14px"}, [el("p", {class:"eyebrow", text:"Food safety first"}), el("p", {text:"Home canning is safe when you follow tested recipes and methods. Always use USDA or USU Extension tested recipes, and adjust processing times for our elevation."}), el("a", {href:"https://extension.usu.edu/preserve-the-harvest/", target:"_blank", rel:"noopener", text:"USU Extension: Preserve the Harvest"})]) : null,
    el("h2", {style:"margin:22px 0 10px", text: cls.length ? "Upcoming classes" : "Classes"}),
    cls.length ? el("div", {class:"grid"}, cls.map(c => classCard(c,f))) : el("p", {class:"meta", text:"No class is scheduled right now. Reach out to the teacher below to ask about the next one."}),
    (f.links && f.links.length) || f.contact ? el("div", {class:"card cta", style:"margin-top:18px"}, [el("div", {}, [el("p", {class:"eyebrow", text:"Find " + (f.business || f.teacher)}), f.contact ? el("p", {text:f.contact}) : null, el("div", {class:"btns", style:"margin:6px 0 0"}, (f.links||[]).map(x => el("a", {class:"btn blue", href:x.href, target:"_blank", rel:"noopener", text:x.label})))])]) : null,
    el("p", {class:"fair", style:"margin-top:18px"}, [document.createTextNode("Valley Know-How features are free. Teachers run their own classes and sign-ups. "), el("a", {href:"know-how.html", text:"See all classes"})]) );
}
})();
