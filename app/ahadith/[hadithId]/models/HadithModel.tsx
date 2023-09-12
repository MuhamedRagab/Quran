import React from "react";
import { type IHadithInfo } from "../page";
import { AiOutlineClose } from "react-icons/ai";

interface Props extends IHadithInfo {}

export default function HadithModel({ arab, id, number }: Props) {
  return (
    <dialog id="hadith_model" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2">
            <AiOutlineClose size={24} />
          </button>
        </form>
        <h3 className="font-bold text-lg" dir="ltr">
          {number}
        </h3>
        <p className="py-4 leading-8">{arab}</p>
        <p className="font-bold text-lg" dir="ltr">
          {id}
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="outline-none">close</button>
      </form>
    </dialog>
  );
}
