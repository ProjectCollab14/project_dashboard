import { ColorModeContext, useMode} from "./theme";
import { CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./scenes/dashboard/global/Topbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/dashboard/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/dashboard/Team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/Contacts";
import Bar from "../src/components/BarChart";
import Form from "./scenes/form";
import Line from "../src/components/LineChart";
import Pie from  "../src/components/PieChart";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar";

function App() {
  const [theme,colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
    <div className="app">
      <Sidebar />
      <main className ="content">
        <Topbar />
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/faq" element={<FAQ />}/>
          <Route path="/bar" element={<Bar />} />
          <Route path="/calendar" element={<Calendar />} /> 
          <Route path="/pie" element={<Pie />} />
          <Route path="/line" element={<Line />} />
          <Route path="/geography" element={<Geography />} />
          
          
        </Routes>
        </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
    
  );
}

export default App;
