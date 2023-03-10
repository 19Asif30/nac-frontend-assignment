import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import Table from "./components/Table";
import { grey } from "./components/colors";
import { MyContext } from "./components/AppContext";

function App() {
  const { state, dispatch } = useContext(MyContext);
  const [post, setPost] = useState(false);

  useEffect(() => {
    dispatch({ type: "enable_reset" });
  }, [state.data, state.columns]);

  const updateData = () => {
    let data = [state.data[state.data.length - 1]];
    fetch("https://sheetdb.io/api/v1/46h3j5y8r4kdw", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    if (state.data && post) {
      updateData();
      setPost((prev) => !prev);
    }
  }, [post]);

  console.log(state.data);

  // let id = "LastName";
  // let initialValue = "ss";

  // useEffect(() => {
  //   let url = `https://sheetdb.io/api/v1/46h3j5y8r4kdw/${id}/${initialValue}`;
  //   fetch(url, {
  //     method: "PATCH",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       data: {
  //         LastName: "Sharma",
  //       },
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: grey(800) }}>NAC Assignment Frontend</h1>
        <h1 style={{ color: grey(800) }}>React JS Table</h1>
      </div>
      <div style={{ overflow: "auto", display: "flex" }}>
        <div
          style={{
            flex: "1 1 auto",
            padding: "1rem",
            maxWidth: 1000,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Table
            columns={state.columns}
            data={state.data}
            dispatch={dispatch}
            skipReset={state.skipReset}
          />
        </div>
      </div>
      <div
        style={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <button
          className="submit-button"
          onClick={() => setPost((prev) => !prev)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
