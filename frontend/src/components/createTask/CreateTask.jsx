import React, { useState, useEffect } from "react";
import { useContext } from "react";
import TaskContext from "../../context/TaskContext";
import TokenContext from "../../context/TokenContext";
import axios from "../../Axios/axios.js";
import Snackbar from "@mui/material/Snackbar";
import "./createTask.css";
import CategoryContext from "../../context/CategoryContext";

const vertical = "bottom";
const horizontal = "center";

function CreateTask() {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const { category } = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [refData, setRefData] = useState("");
  const [imgQData, setImgQData] = useState(null);
  const [imgAData, setImgAData] = useState(null);
  const [imgBData, setImgBData] = useState(null);
  const [imgCData, setImgCData] = useState(null);
  const [imgDData, setImgDData] = useState(null);
  const [imgRData, setImgRData] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [realId, setRealId] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackText, setSnackText] = useState("");

  useEffect(() => {
    async function getCategoryFunc() {
      try {
        const res = await axios.get("/category/getCategory");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCategoryFunc();
  }, []);

  useEffect(() => {
    setAddCategory(category);
  }, [category]);

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/task/addTask",
        {
          subCategory: addCategory,
          subHeading,
          question,
          answerA,
          answerB,
          answerC,
          answerD,
          refData,
          correctAnswer,
          imgAData,
          imgBData,
          imgCData,
          imgDData,
          imgQData,
          imgRData,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setRealId(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setSnackText(error.response.data.message);
      setOpenSnack(true);
    }
    dispatch({
      type: "ADD_TASK",
      subCategory,
      subHeading,
      question,
      realId,
    });

    setSnackText("成果的に登録されました。");
    setOpenSnack(true);

    setSubHeading("");
    setQuestion("");
    setAnswerA("");
    setAnswerB("");
    setAnswerC("");
    setAnswerD("");
    setRefData("");
    setCorrectAnswer("");
    // reset();
  };

  const handleImageChange = (e, setImageData) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          setImageData(reader.result); // Use the passed function to set data
        };
        img.onerror = () => {
          console.error("The file could not be read as an image.");
        };
      };

      reader.readAsDataURL(file);
    } else {
      console.error("Please upload a valid image file.");
    }
  };

  const handleCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };

  const AddCategoryFunc = async () => {
    if (addCategory !== "") {
      categories.push({ name: addCategory });
      try {
        await axios.post("/category/addCategory", {
          categories,
        });
        window.location.reload();
        setSnackText("成果的に登録されました。");
        setOpenSnack(true);
      } catch (error) {
        setSnackText(error.response.data.message);
        setOpenSnack(true);
      }
    } else {
      setSnackText("Fill out the category name to add");
      setOpenSnack(true);
    }
  };

  return (
    <div className="addContainer md:w-2/3 md:mx-auto mx-3 mt-3 flex justify-center">
      <div className="w-11/12">
        <form onSubmit={handleAdd}>
          <div>
            <label htmlFor="title">Question Category</label>
            <div className="flex flex-row w-full py-2.5 items-center">
              <input
                required
                type="text"
                name="addCategory"
                id="addCategory"
                value={addCategory}
                onChange={(e) => setAddCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                type="button"
                className=" bg-blue-700 rounded-full text-white py-3 px-5 font-bold text-lg ml-5"
                onClick={AddCategoryFunc}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="title">QuestionTitle</label>
            <input
              type="text"
              name="subHeading"
              id="subHeading"
              value={subHeading}
              required
              onChange={(e) => setSubHeading(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="my-3">
            <label htmlFor="question">Question</label>
            <textarea
              rows={3}
              name="question"
              id="question"
              value={question}
              required
              onChange={(e) => setQuestion(e.target.value)}
              style={{ resize: "none" }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setImgQData)}
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary my-3"
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="md:w-1/2 md:mx-auto pr-3">
              <label htmlFor="title">Answer A</label>
              <input
                type="text"
                name="answerA"
                id="answerA"
                value={answerA}
                required
                onChange={(e) => setAnswerA(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setImgAData)}
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary my-3"
              />
            </div>
            <div className="md:w-1/2 md:mx-auto pl-3">
              <label htmlFor="title">Answer B</label>
              <input
                type="text"
                name="answerB"
                id="answerB"
                value={answerB}
                required
                onChange={(e) => setAnswerB(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setImgBData)}
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary my-3"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="md:w-1/2 md:mx-auto pr-3">
              <label htmlFor="title">Answer C</label>
              <input
                type="text"
                name="answerC"
                id="answerC"
                value={answerC}
                required
                onChange={(e) => setAnswerC(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setImgCData)}
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary my-3"
              />
            </div>
            <div className="md:w-1/2 md:mx-auto pl-3">
              <label htmlFor="title">Answer D</label>
              <input
                type="text"
                name="answerD"
                id="answerD"
                value={answerD}
                onChange={(e) => setAnswerD(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setImgDData)}
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary my-3"
              />
            </div>
          </div>

          <div>
            <label htmlFor="title">Reference Data</label>
            <input
              type="text"
              name="refData"
              id="refData"
              value={refData}
              onChange={(e) => setRefData(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setImgRData)}
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary my-3"
            />
          </div>
          <div>
            <label htmlFor="title">Correct Answer</label>
            <select
              name="correctAnswer"
              id="correctAnswer"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
              onChange={(e) => setCorrectAnswer(e.target.value)}
              value={correctAnswer}
            >
              <option defaultValue={""}></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-blue-700 rounded-md text-white px-5 py-3 w-36 font-bold text-lg"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnack}
        onClose={handleCloseSnack}
        message={snackText}
        key={vertical + horizontal}
      />
    </div>
  );
}

export default CreateTask;
