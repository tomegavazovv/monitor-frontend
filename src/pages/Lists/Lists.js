import React, { useEffect, useState } from "react";
import styles from "./Lists.module.css";
import editImg from "../../assets/edit_name.svg";
import deleteImg from "../../assets/delete.svg";
import addImg from "../../assets/add.svg";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/ModalList/Modal";
import { Loader } from "../../components/Loader/Loader";
import AwareListsButton from "../../components/AwareListsButton/AwareListsButton";
import dispatchEvent from "../../utils/dispatchEvent";
import tableImg from "../../assets/table.svg";
import DotsLoader from "../../components/DotsLoader/DotsLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLists,
  selectLists,
  createList,
  renameList,
  removeList,
  csvUploading,
  shouldReload,
} from "../../store/features/lists/listsSlice";

const Lists = () => {
  const navigate = useNavigate();
  const lists = useSelector(selectLists);

  const reloadList = useSelector(shouldReload);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [toDeleteListId, setToDeleteListId] = useState(null);
  const [editListId, setEditListId] = useState(null);
  const [editListName, setEditListName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const awareSyncing = lists.findIndex((list) => list.loading) !== -1;
  const [awareListsFetching, setAwareListsFetching] = useState(0);
  const [awareSyncStatus, setAwareSyncStatus] = useState(false);
  const [isAddingList, setIsAddingList] = useState(false);
  const [isDeletingList, setIsDeletingList] = useState(false);
  const [isUpdatingList, setIsUpdatingList] = useState(false);
  const [updateListErrorMessage, setUpdateListErrorMessage] = useState("");
  const [aware, setAware] = useState(false);

  useEffect(() => {
    const handleExtensionMessage = (event) => {
      if (event.data.type === "FROM_EXTENSION_REFRESH_LISTS") {
        dispatch(fetchLists()).then((res) => {
          setAwareListsFetching(0);
          setAwareSyncStatus(true);
        });
      } else if (event.data.type === "FROM_EXTENSION_AWARE") {
        setAware(event.data.payload);
      } else if (event.data.type === "FROM_EXTENSION_LISTS_CSV_UPLOADING") {
        dispatch(csvUploading(event.data.payload));
      }
    };

    window.addEventListener("message", handleExtensionMessage);
    dispatchEvent("checkAware", {});
    return () => {
      window.removeEventListener("message", handleExtensionMessage);
    };
  }, []);

  useEffect(() => {
    const initLists = () => {
      setLoading(true);
      dispatch(fetchLists())
        .then(() => {
          setLoading(false);
          dispatchEvent("getCsvUploadingLists");
        })
        .catch((err) => setLoading(false));
    };
    console.log(reloadList);
    if (lists.length === 0 || reloadList) {
      initLists();
    }
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setNewListName("");
    setIsModalOpen(false);
    setEditModalOpen(false);
    setEditListName("");
  };

  const handleInputChange = (e) => {
    setErrorMessage("");
    setNewListName(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setUpdateListErrorMessage("");
    setEditListName(e.target.value);
  };

  const handleDeleteClick = async (list) => {
    setDeleteModalOpen(true);
    setToDeleteListId(list.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsAddingList(true);

    const resultAction = await dispatch(createList(newListName));
    if (createList.fulfilled.match(resultAction)) {
      setErrorMessage("");
      handleModalClose();
      setIsAddingList(false);
    } else if (createList.rejected.match(resultAction)) {
      setErrorMessage(resultAction.payload);
      setIsAddingList(false);
    }
  };

  const handleEditClick = (id, name) => {
    setEditModalOpen(true);
    setEditListId(id);
    setEditListName(name);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsUpdatingList(true);

    try {
      const resultAction = await dispatch(
        renameList({ id: editListId, name: editListName })
      );

      if (renameList.rejected.match(resultAction)) {
        setUpdateListErrorMessage(resultAction.payload);
      } else if (renameList.fulfilled.match(resultAction)) {
        handleModalClose();
        setEditListName("");
        setEditListId(null);
      }
      setIsUpdatingList(false);
    } catch (err) {
      setIsUpdatingList(false);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    setIsDeletingList(true);
    try {
      dispatch(removeList(toDeleteListId));

      setIsDeletingList(false);
      setToDeleteListId(null);
      setDeleteModalOpen(false);
      const list = lists.find((list) => list.id === toDeleteListId);
      if (list.loading) {
        dispatchEvent("removedAwareList", { listId: list.id });
      }
      if (list.csvUploading) {
        dispatchEvent("removedCsvList", { listId: list.id });
      }
    } catch {
      setIsDeletingList(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.buttons_container}>
        <div className={styles.add_container} onClick={handleAddClick}>
          <img src={addImg} className={styles.add_new} alt="Add" />
          <span className={styles.add_text}>Add List</span>
        </div>
        {aware && (
          <div style={{ marginTop: "-7px" }}>
            <AwareListsButton
              dispatchSubmittedSync={(n) => setAwareListsFetching(n)}
              syncedListsValues={lists
                .map((list) => list.value)
                .filter(Boolean)}
              loading={awareSyncing}
            />
          </div>
        )}
      </div>
      <Modal isOpen={awareSyncStatus} onClose={() => setAwareSyncStatus(false)}>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "14px" }}>
            The syncing will take <strong>from a few minutes to a day</strong>,
            depending on the size of your Aware lists.
          </span>
          <br />
          <br />
          <span style={{ fontSize: "14px" }}>
            The users will be split into lists x 25 users, due to LinkedIn
            Safety.
          </span>
        </div>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <form className={styles.add_new_form} onSubmit={handleSubmit}>
          <input
            type="text"
            autoFocus
            value={newListName}
            onChange={handleInputChange}
            className={styles.add_input}
            placeholder="Name of the list"
          />
          {errorMessage !== "" && (
            <p
              style={{
                color: "red",
                margin: "0px",
                fontSize: "13px",
                marginTop: "5px",
                fontWeight: "500",
              }}
            >
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className={styles.add_list_btn}
            disabled={isAddingList}
          >
            Add List
          </button>
          {isAddingList && (
            <div style={{ marginTop: "15px" }}>
              {" "}
              <Loader width="30px" />
            </div>
          )}
        </form>
      </Modal>
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <form className={styles.add_new_form} onSubmit={handleDeleteSubmit}>
          <p>Are you sure that you want to delete this list?</p>
          <button
            type="submit"
            className={styles.add_list_btn}
            disabled={isDeletingList}
          >
            Yes
          </button>
          {isDeletingList && (
            <div style={{ marginTop: "15px" }}>
              {" "}
              <Loader width="30px" />
            </div>
          )}
        </form>
      </Modal>
      <Modal isOpen={editModalOpen} onClose={handleModalClose}>
        <form className={styles.add_new_form} onSubmit={handleEditSubmit}>
          <input
            type="text"
            autoFocus
            value={editListName}
            onChange={handleEditInputChange}
            className={styles.edit_input}
            placeholder="Edit list name"
          />
          <button
            type="submit"
            className={styles.edit_list_btn}
            disabled={isUpdatingList}
          >
            Update Name
          </button>
          {updateListErrorMessage !== "" && (
            <p
              style={{
                color: "red",
                margin: "0px",
                fontSize: "13px",
                marginTop: "5px",
                fontWeight: "500",
              }}
            >
              {updateListErrorMessage}
            </p>
          )}
          {isUpdatingList && (
            <div style={{ marginTop: "15px" }}>
              {" "}
              <Loader width="30px" />
            </div>
          )}
        </form>
      </Modal>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header + " " + styles.tr}>
            <th className={styles.th}>Name</th>
            <th className={styles.th} style={{ textWrap: "nowrap" }}>
              Users Number<span style={{ fontSize: "12px" }}> / 25 </span>
            </th>
            <th className={styles.th}>Engagement Report</th>
            <th className={styles.th}></th>
          </tr>
        </thead>
      </table>
      {loading ? (
        <div className={styles.loader_container}>
          <Loader />
          <p className={styles.loader_text}>Loading...</p>
        </div>
      ) : (
        <div className={styles.scrollableBody}>
          <table className={styles.table}>
            <tbody className={styles.table_body}>
              {lists.map((list, index) => (
                <tr className={styles.tr} key={index}>
                  <td
                    className={styles.td}
                    onClick={() => navigate(`/home/lists/${list.id}`)}
                  >
                    <div className={styles.name_column}>
                      <span className={styles.name}>{list.name}</span>
                    </div>
                  </td>
                  <td className={styles.monitored_number + " " + styles.td}>
                    {list.loading || list.csvUploading ? (
                      <div
                        style={{
                          display: "flex",
                          columnGap: "1px",
                          alignItems: "end",
                          justifyContent: "center",
                          marginLeft: "17px",
                        }}
                      >
                        <div className={styles.number}>
                          {list.numberMonitored}{" "}
                        </div>
                        <DotsLoader />
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <span
                          className={`${styles.number} ${
                            list.numberMonitored >= 25 ? styles.full_list : ""
                          }`}
                        >
                          {list.numberMonitored || 0}{" "}
                        </span>
                      </div>
                    )}
                  </td>

                  <td className={`${styles.td} ${styles.engagement}`}>
                    {list.loading || list.csvUploading ? (
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          columnGap: "1px",
                          alignItems: "end",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            textWrap: "none",
                            margin: "0",
                            marginBottom: "-2px",
                            fontWeight: "500",
                            textAlign: "center",
                          }}
                        >
                          {list.loading ? "Syncing with Aware" : "CSV Syncing"}
                        </span>

                        <DotsLoader />
                      </div>
                    ) : (
                      <div
                        className={styles.view_report_container}
                        onClick={() =>
                          navigate(`/home/lists/${list.id}/engagementReport`)
                        }
                      >
                        <img src={tableImg} className={styles.table_img} />{" "}
                        <div className={styles.view_text}>View</div>
                      </div>
                    )}
                  </td>
                  <td className={styles.actions + " " + styles.td}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                      }}
                    >
                      <img
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(list.id, list.name);
                        }}
                        className={styles.edit_image}
                        src={editImg}
                        alt="Edit"
                      />
                      <img
                        className={styles.delete_image}
                        src={deleteImg}
                        alt="Delete"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the click from propagating to the parent row
                          handleDeleteClick(list);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {Array.from(Array(awareListsFetching).keys()).map((_) => {
                return (
                  <tr style={{ width: "100%" }}>
                    <td>
                      <div
                        style={{
                          width: "400%",
                          display: "flex",
                          justifyContent: "center",
                          padding: "10px 0px",
                          borderBottom: "1.5px solid rgb(212, 211, 211)",
                        }}
                      >
                        <Loader width="30px" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Lists;
