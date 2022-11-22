import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cls } from "../assets/utils";
import { ModalNum, isModal, totaltimeState } from "../state/states";

export default function Button({
  text,
  onGoBack,
  large,
  onGoMain,
  beforeModal,
  saveModal,
  workoutodone,
  onClick,
}) {
  const setIsModalOpen = useSetRecoilState(isModal);
  const [modalNum, setModalNum] = useRecoilState(ModalNum);
  const setIsdone = useSetRecoilState(totaltimeState);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goMain = () => {
    navigate("/");
  };
  const goBeforeModal = () => {
    setModalNum(modalNum - 1);
  };
  const goSaveModal = () => {
    setIsModalOpen(false);
    setModalNum(0);
  };
  const finishworkout = () => {
    setIsdone(0);
    navigate("/");
  };
  return (
    <button
      onClick={
        onClick ||
        (onGoBack && goBack) ||
        (onGoMain && goMain) ||
        (beforeModal && goBeforeModal) ||
        (saveModal && goSaveModal) ||
        (workoutodone && finishworkout) ||
        undefined
      }
      className={cls(
        "px-9 py-2 bg-d-button hover:bg-d-button-hover ease-out duration-150 text-white border border-transparent rounded-md shadow-sm font-medium",
        large ? "text-xl" : "text-lg"
      )}
    >
      {text}
    </button>
  );
}
