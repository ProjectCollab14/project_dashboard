import React, { useState } from 'react';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/dashboard/global/Topbar";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Signin from "../src/Login/Signin";
import Signup from "../src/Login/Signup";
import AuthDetails from "../src/Login/AuthDetails";
import IsNotAuthenticated from "../src/Login/IsNotAuthenticated";
import IsAuthenticated from "../src/scenes/isAuthenticated";

function App() {
  const [theme, colorMode] = useMode();
  const [authenticated, setAuthenticated] = useState(false);

  
  const handleAuthStatusChange = (isAuthenticated) => {
    setAuthenticated(isAuthenticated);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar handleAuthStatusChange={handleAuthStatusChange} isauthenticated={authenticated}/>
          <main className="content">
            <Topbar />
            
              <Routes>
              <Route path="/" element={<IsAuthenticated authenticated={authenticated}/>}>
                <Route path="team" element={<Team />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="form" element={<Form />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="bar" element={<Bar />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="pie" element={<Pie />} />
                <Route path="line" element={<Line />} />
                <Route path="geography" element={<Geography />} />
              </Route>
                <Route path="/" element={<IsNotAuthenticated authenticated={authenticated}/>}>
                  <Route path="signin" element={<Signin onAuthChange={(value)=>handleAuthStatusChange(value)} />} />
                  <Route path="signup" element={<Signup onAuthChange={(value)=>handleAuthStatusChange(value)} />} />
              </Route>
                  <Route path="*" element={<Navigate to="/" />} />

                  <Route path="auth" element={<AuthDetails />} />
              </Routes>
              <>
                {/* <Route path="/" element={<Signin onAuthChange={handleAuthStatusChange} />} />
                <Route path="/signup" element={<Signup onAuthChange={handleAuthStatusChange} />} />
                <Route path="/auth" element={<AuthDetails />} />
                
                <Route path="*" element={<Navigate to="/" />} /> */}
              </>
            {/* )} */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
