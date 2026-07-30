const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const TECHNULA_KNOWLEDGE = `
COMPANY NAME: Technula (RoboAIAPaths)
WEBSITE: https://technula.com/ | https://www.roboaiapaths.com/

DIVISIONS: 
1. Enterprise SaaS & Software Engineering
   - SchoolOS ERP: School & Academy management system
   - LogDay HRMS: Attendance, WFH, field sales & payroll tracking
   - HIMS Enterprise: Hospital & Clinic management system
   - FitOS Gym: Fitness & Gym management SaaS
   - StockMaster: E-Commerce & Inventory management
   - 360° Digital Marketing & LegalAlert Tax

2. RoboAIAPaths (STEM Robotics, AI EdTech & Kits)
   - Focus: Nursery to 8th standard kids and students
   - Age-Wise Learning:
     * Nursery to Class 2: Play-based STEM, basic logic, shapes, observation, creativity & simple build activities
     * Class 3 to 5: Beginner robotics, sensors, coding, guided projects & demos
     * Class 6 to 8: Robotics & AI fundamentals, structured coding, real-world challenges & project-based STEM education
   - Courses: 
     1. Introduction to Robotics (basic robotics, mechanical design, sensors, hardware)
     2. Robo Expert (advanced robotics topics, complex systems)
     3. Robo Advance (robot programming, machine learning, IoT, AI)
     4. Coding (interactive practical project-based logic & programming)
     5. Mechatronics (mechanics, electronics, robotics design & control)
     6. Web Development (beginner to advanced web development)
   - STEM Robotics Kits: 11 hardware kits (Non Programmable Kit, Otto Ninja, Jetty Bot Car, Smart IoT Home, PC Bot, etc.)
   - Demo Class: Free demo classes offered. Collect name, phone, child class, and course interest.

FOUNDER & TEAM:
- Rashmi Kansal (Founder, 15+ years experience, M.Ed, M.Sc)
- Ankit Gupta (Director)

CONTACT INFO:
- Phone: +91 9990911093
- Email: info@technula.com | roboaiapaths@gmail.com
- Location: S20, Amolik Sankalp, Sector 85, Faridabad, Haryana, India
- Branch: S7, RPS Savana, Sector 88, Faridabad
`;

async function getChatbotResponse(userMessage) {
  if (!GEMINI_API_KEY) {
    return "Technula & RoboAIAPaths offers enterprise SaaS solutions (SchoolOS ERP, LogDay HRMS, HIMS) and STEM robotics education for Nursery to 8th class. How can we assist you today? Call us at +91 9990911093!";
  }

  try {
    const prompt = `You are Technula & RoboAIAPaths AI Assistant. Reply as official RoboAIAPaths Assistant. Keep replies short and clear. Use simple English or Hinglish. Use the knowledge below to help visitors with SaaS products, custom software, robotics courses, demo class bookings, and kits.

KNOWLEDGE BASE:
${TECHNULA_KNOWLEDGE}

USER MESSAGE:
${userMessage}
`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    return "Technula & RoboAIAPaths provides enterprise SaaS platforms and STEM robotics education in Faridabad. Call +91 9990911093 for immediate demo & course details!";
  }
}

module.exports = { getChatbotResponse };
