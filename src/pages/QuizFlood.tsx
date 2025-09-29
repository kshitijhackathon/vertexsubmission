import React, { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";

type Question = {
  id: number;
  text: string;
  options: { key: string; label: string }[];
  answer: string; // key, e.g., 'b'
};

const RAW_QUESTIONS = [
  { q: "Which of the following is the primary natural cause of floods?", opts: ["Deforestation","Excessive rainfall","Urbanization","Dam construction"], ans: "b" },
  { q: "Which river is most prone to floods in India?", opts: ["Ganga","Yamuna","Brahmaputra","Godavari"], ans: "c" },
  { q: "Flash floods are mainly caused by:", opts: ["Melting glaciers","Cloudburst","Landslides","Cyclones"], ans: "b" },
  { q: "Which of these is a man-made cause of floods?", opts: ["Heavy monsoon","Tsunami","Encroachment on river beds","Melting snow"], ans: "c" },
  { q: "Flood forecasting in India is handled by:", opts: ["ISRO","IMD (Indian Meteorological Department)","CWC (Central Water Commission)","NDMA (National Disaster Management Authority)"], ans: "c" },
  { q: "Which state in India is most flood-prone?", opts: ["Rajasthan","Bihar","Kerala","Gujarat"], ans: "b" },
  { q: "The 2018 floods in Kerala were mainly caused due to:", opts: ["Cyclone","Cloudburst and heavy rainfall","Dam burst","Glacier melting"], ans: "b" },
  { q: "Floods caused due to sudden release of water from glaciers are called:", opts: ["Cloudburst floods","Flash floods","Glacial Lake Outburst Floods (GLOF)","Coastal floods"], ans: "c" },
  { q: "Which of the following disasters is most likely to occur after floods?", opts: ["Earthquake","Epidemic outbreak","Volcanic eruption","Wildfire"], ans: "b" },
  { q: "Which international organization helps countries in flood management?", opts: ["WHO","UNESCO","WMO (World Meteorological Organization)","WTO"], ans: "c" },
  { q: "Structural measure to control flood is:", opts: ["Afforestation","Construction of dams","Early warning systems","Public awareness"], ans: "b" },
  { q: "Non-structural measure of flood management is:", opts: ["Embankments","Dams","Flood forecasting and zoning","Reservoirs"], ans: "c" },
  { q: "Which of the following rivers caused the 2008 Kosi floods in Bihar?", opts: ["Ganga","Kosi","Yamuna","Teesta"], ans: "b" },
  { q: "Urban flooding is mainly due to:", opts: ["Deforestation","Poor drainage system","Earthquakes","Melting glaciers"], ans: "b" },
  { q: "Which type of flood occurs along coastal areas?", opts: ["Flash floods","Tsunami floods","Storm surge floods","River floods"], ans: "c" },
  { q: "Which satellite system in India helps in flood monitoring?", opts: ["GSAT","INSAT","IRNSS","Kalpana"], ans: "b" },
  { q: "Floods in Assam are mainly caused by:", opts: ["Melting glaciers","Heavy rainfall and Brahmaputra overflow","Poor drainage","Tsunami waves"], ans: "b" },
  { q: "Which Indian act deals with disaster management, including floods?", opts: ["Water Act 1974","Environment Protection Act 1986","Disaster Management Act 2005","River Basin Act 2010"], ans: "c" },
  { q: "Flood plains are useful because:", opts: ["They help in earthquake prevention","They make soil very fertile","They prevent cyclones","They reduce landslides"], ans: "b" },
  { q: "Which of the following is the safest practice during floods?", opts: ["Stay near river banks","Use electrical appliances","Move to higher ground","Travel through floodwater"], ans: "c" }
];

function buildQuestions(): Question[] {
  return RAW_QUESTIONS.map((item, idx) => ({
    id: idx + 1,
    text: item.q,
    options: ["a","b","c","d"].map((k, i) => ({ key: k, label: item.opts[i] })),
    answer: item.ans
  }));
}

export const QuizFlood: React.FC = () => {
  const questions = useMemo(buildQuestions, []);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(questions.length * 30); // 30s per question
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(timerRef.current!);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const handleSelect = (key: string) => {
    const qid = questions[index].id;
    setSelected((prev) => ({ ...prev, [qid]: key }));
  };

  const handleNext = () => {
    if (index < questions.length - 1) setIndex(index + 1);
  };
  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleSubmit = () => {
    let s = 0;
    for (const q of questions) {
      const user = selected[q.id];
      if (!user) continue;
      if (user === q.answer) s += 4; else s -= 1;
    }
    setScore(s);
  };

  const mm = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const ss = Math.floor(timeLeft % 60).toString().padStart(2, '0');

  const q = questions[index];
  const userAns = selected[q.id];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Flood Preparedness Quiz</h1>
          <div className="flex items-center text-gray-700 font-semibold">
            <Clock className="w-5 h-5 mr-2" />
            <span>{mm}:{ss}</span>
          </div>
        </div>

        {score === null ? (
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Question {index + 1} of {questions.length}</p>
              <h2 className="text-xl font-semibold text-gray-900 mt-2">{q.text}</h2>
            </div>

            <div className="space-y-3">
              {q.options.map((opt) => (
                <label key={opt.key} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${userAns === opt.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    className="mr-3"
                    name={`q-${q.id}`}
                    checked={userAns === opt.key}
                    onChange={() => handleSelect(opt.key)}
                  />
                  <span className="uppercase font-semibold mr-2">{opt.key})</span>
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={handlePrev} disabled={index===0} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 disabled:opacity-50">Previous</button>
              {index < questions.length - 1 ? (
                <button onClick={handleNext} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Next</button>
              ) : (
                <button onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-emerald-600 text-white">Submit</button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center mb-4">
              {score >= 0 ? <CheckCircle2 className="w-6 h-6 text-emerald-600 mr-2" /> : <XCircle className="w-6 h-6 text-red-600 mr-2" />}
              <h2 className="text-xl font-semibold">Your Score: {score}</h2>
            </div>
            <p className="text-gray-600 mb-4">Scoring: +4 for correct, -1 for wrong. Unattempted: 0.</p>
            <div className="space-y-3">
              {questions.map((qq) => {
                const u = selected[qq.id];
                const correct = u === qq.answer;
                return (
                  <div key={qq.id} className={`p-3 rounded-xl border ${u ? (correct ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50') : 'border-gray-200'}`}>
                    <div className="font-medium">Q{qq.id}. {qq.text}</div>
                    <div className="text-sm mt-1">Your answer: <span className="uppercase">{u ?? '—'}</span> | Correct: <span className="uppercase">{qq.answer}</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="mt-4 text-sm text-gray-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>This is a demo quiz with fixed questions.</div>
      </div>
    </section>
  );
};


