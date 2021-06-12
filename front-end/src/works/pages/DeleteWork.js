import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import MyModal from "../../shared/components/UIElements/MyModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const DeleteWork = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [text, setText] = useState(null);
  const workId = useParams().workId;
  const history = useHistory();
  const cancelModalHandler = () => {
    setText(null);
    history.push("/work");
  };
  useEffect(() => {
    const deleteWork = async () => {
      try {
        await sendRequest(`http://localhost:5000/api/work/${workId}`, "DELETE");
        setText("Work Deleted Successfully");
      } catch (error) {}
    };
    deleteWork();
  }, [sendRequest, workId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <MyModal
        text={text}
        header="Deleted Successfully"
        onClear={cancelModalHandler}
      />
    </React.Fragment>
  );
};

export default DeleteWork;
