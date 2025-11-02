import { RouterProvider } from "react-router-dom";
import routes from "../src/router/router";
import { ProvidersQuery } from "./providers";

function App() {
  return (
    <>
      <ProvidersQuery>
        <RouterProvider router={routes} />
      </ProvidersQuery>
    </>
  );
}

export default App;
