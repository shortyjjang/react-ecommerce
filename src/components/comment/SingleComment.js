import React, { useEffect, useState } from 'react';

export default function SingleComment(props) {
    const [showModify, setShowModify] = useState(false);
    const deleteComment = (e) => {
        e.preventDefault();
    }
    const modifyComment = (e) => {
        e.preventDefault();
    }
    return (
        <li className="commentItem">
            <strong className="name">{props.comment.writer}</strong>
            <span className="date">{props.comment.createdAt}</span>
            <div className="button">
                {!showModify &&<button className="btnNormal " onClick={() => setShowModify(true)}>수정</button>}
                <button className="btnNormal " onClick={deleteComment}>삭제</button>
            </div>
            <div className="content">
                {props.comment.content}
            </div>
            {showModify &&
                <CommentForm comment={props.comment} setShowModify={(val) => setShowModify(val)} modifyComment={(commentValue) => modifyComment(commentValue)} modify={true} />
            }
        </li>
    )
}