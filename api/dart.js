export default async function handler(req, res) {
  // CORS 허용 헤더 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { corp_code = "00146038", page_no = "1", page_count = "10" } = req.query;
  const apiKey = process.env.DART_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "DART API 키가 설정되지 않았습니다." });
  }

  const targetUrl = `https://opendart.fss.or.kr/api/list.json?crtfc_key=${apiKey}&corp_code=${corp_code}&page_no=${page_no}&page_count=${page_count}`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "DART API 호출 실패", details: error.message });
  }
}
