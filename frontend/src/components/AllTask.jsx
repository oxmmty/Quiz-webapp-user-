import React from "react";
import Task from "./Task/Task";
import { useContext, useState, useEffect } from "react";
import TaskContext from "../context/TaskContext";
import CategoryContext from "../context/CategoryContext";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "../Axios/axios.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AllTask() {
  const { tasks } = useContext(TaskContext);
  const { categoryDispatch } = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editCategoryName, setEditCategoryName] = useState();
  const [editCategoryIndex, setEditCategoryIndex] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteCategoryName, setDeleteCategoryName] = useState("");

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

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  async function handleRemove(e) {
    e.preventDefault();
    const deleteCategoryResponse = axios.post("/category/deleteCategory", {
      editCategoryIndex,
    });
    const deleteAllDataResponse = axios.post("/task/changeCategoryDeleteData", {
      deleteCategoryName,
    });

    // Wait for both requests to finish
    await Promise.all([deleteCategoryResponse, deleteAllDataResponse]);

    handleCloseEdit();
    window.location.reload();
  }

  const handleAddButton = (categoryName) => {
    categoryDispatch({
      type: "SET_CATEGORY",
      payload: categoryName,
    });
  };

  const handleEditCategoryName = (e, categoryName, index) => {
    e.preventDefault();
    setOpenEdit(true);
    setEditCategoryName(categoryName);
    setEditCategoryIndex(index);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <div>
        {categories.length !== 0 ? (
          categories.map((category, index) => {
            let i = 0;
            return (
              <div
                className="bg-slate-300 py-4 rounded-lg shadow-md  gap-2 mb-3 px-3"
                key={index}
              >
                <div className="flex justify-between font-bold">
                  <div
                    className="cursor-pointer"
                    onClick={(e) =>
                      handleEditCategoryName(e, category.name, index)
                    }
                  >
                    {category.name}
                  </div>
                  <div>
                    <AddIcon
                      style={{ fontSize: 30, cursor: "pointer" }}
                      size="large"
                      onClick={() => handleAddButton(category.name)}
                      className="remove-task-btn bg-blue-700 mr-1 rounded-full border-2 shadow-2xl border-white p-1 text-white"
                    />
                    <DeleteIcon
                      style={{ fontSize: 30, cursor: "pointer" }}
                      size="large"
                      onClick={() => {
                        setOpenDeleteDialog(true);
                        setDeleteCategoryName(category.name);
                        setEditCategoryIndex(index);
                      }}
                      className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1 text-white"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap">
                  {tasks.length !== 0 ? (
                    tasks.map((task, taskindex) => {
                      if (category.name === task.subCategory) {
                        i++;
                        return (
                          <Task
                            key={taskindex}
                            task={task}
                            id={i}
                            onClick={() => {
                              setTaskId(task._id);
                            }}
                          />
                        );
                      }
                      return null;
                    })
                  ) : (
                    <h1>No Task Found</h1>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Category Found</h1>
        )}
      </div>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const editCategory = formJson.category;
            const editCategoryResponse = axios.post("/category/editCategory", {
              editCategory,
              editCategoryIndex,
            });
            const changeCategoryResponse = axios.post("/task/changeCategory", {
              editCategory,
              editCategoryName,
            });

            // Wait for both requests to finish
            await Promise.all([editCategoryResponse, changeCategoryResponse]);

            handleCloseEdit();
            window.location.reload();
          },
        }}
      >
        <DialogTitle>Enter the Question Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="category"
            name="category"
            label="Category"
            fullWidth
            variant="standard"
            defaultValue={editCategoryName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        keepMounted
        onClose={handleCloseDeleteDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure that delete the all datas in {deleteCategoryName}{" "}
            category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Disagree</Button>
          <Button onClick={(e) => handleRemove(e)}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AllTask;
