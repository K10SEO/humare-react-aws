import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {lazy, Suspense} from "react";
import Home from "./pages/Home/Home"

const BusinessOverview = lazy(() => import("./pages/BusinessOverview/BusinessOverview"));
const LocationEnvironment = lazy(() => import("./pages/LocationEnvironment/LocationEnvironment"));
const LocationPlan = lazy(() => import("./pages/LocationPlan/LocationPlan"));
const Type = lazy(() => import("./pages/Type/Type"));
const ModelHouse = lazy(() => import("./pages/ModelHouse/ModelHouse"));

function Router() {
    return(
      <Suspense fallback={<div>loading...</div>}>
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/business_overview' element={<BusinessOverview/>} />
         <Route path='/location_environment' element={<LocationEnvironment/>} />
         <Route path='/Location_plan' element={<LocationPlan/>} />
         <Route path='/Type' element={<Type/>} />
         <Route path='/model_house' element={<ModelHouse/>} />
       </Routes>
      </Suspense>
    )
};

export default Router;
