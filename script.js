
const questions = [
  ["Decisive", "Outgoing", "Gentle", "Analytical"],
  ["Bold", "Talkative", "Patient", "Systematic"],
  ["Assertive", "Optimistic", "Calm", "Detail-oriented"],
  ["Leader", "Friendly", "Reliable", "Cautious"],
  ["Risk-taker", "Cheerful", "Loyal", "Precise"],
  ["Persistent", "Sociable", "Stable", "Organized"],
  ["Independent", "Expressive", "Supportive", "Thorough"],
  ["Goal-oriented", "Fun", "Team player", "Logical"],
  ["Competitive", "Popular", "Respectful", "Fact-based"],
  ["Direct", "Imaginative", "Good listener", "Disciplined"],
  ["Forceful", "Warm", "Steady", "Structured"],
  ["Driven", "Charming", "Understanding", "Meticulous"],
  ["Firm", "Open", "Balanced", "Systematic"],
  ["Commanding", "Lively", "Kind", "Methodical"],
  ["Assertive", "Engaging", "Humble", "Objective"],
  ["Strong-willed", "Enthusiastic", "Predictable", "Exacting"],
  ["Fast-paced", "Talkative", "Soft-spoken", "Precise"],
  ["Fearless", "Upbeat", "Gentle", "Factual"],
  ["Deciding", "Inspiring", "Even-tempered", "Rule-following"],
  ["Resolute", "Outgoing", "Trusting", "Accurate"],
  ["Leader-like", "Excitable", "Thoughtful", "Careful"],
  ["Competitive", "Lively", "Considerate", "Planner"],
  ["Determined", "Engaging", "Patient", "Logical"],
  ["Ambitious", "Expressive", "Composed", "Consistent"]
];

const traits = ["D", "I", "S", "C"];

const container = document.getElementById("questions-container");

questions.forEach((row, i) => {
  const label = document.createElement("label");
  label.innerText = `Question ${i + 1}`;
  container.appendChild(label);

  const select = document.createElement("select");
  select.name = "q" + (i + 1);
  select.required = true;

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.innerText = "-- Choose one --";
  select.appendChild(defaultOption);

  row.forEach((option, idx) => {
    const opt = document.createElement("option");
    opt.value = traits[idx];
    opt.innerText = option;
    select.appendChild(opt);
  });

  container.appendChild(select);
});

document.getElementById("discForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const scores = { D: 0, I: 0, S: 0, C: 0 };

  for (let [key, value] of formData.entries()) {
    if (traits.includes(value)) {
      scores[value]++;
    }
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const timestamp = new Date().toLocaleString();

  fetch("https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbw7kM_jA2bxZNv5eTVp2gNzyoeSkCDEI7l8Lj1fRBjGTqZSL1Q7zuzS99w7ZLeAHcBs/exec/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ timestamp, name, email, ...scores })
  });

  const result = document.getElementById("result");
  result.classList.remove("hidden");
  result.innerHTML = `
    <h3>Results Submitted</h3>
    <p><strong>D:</strong> ${scores.D} | <strong>I:</strong> ${scores.I} | <strong>S:</strong> ${scores.S} | <strong>C:</strong> ${scores.C}</p>
  `;
});
