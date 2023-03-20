import React, { useEffect, useState } from 'react';

export default function CommentForm(props) {
    const [commentValue, setCommentValue] = useState({
        name:'',
        password:'',
        content:''
    })
    const handleComment = (e) => {
        e.preventDefault()
        if(commentValue.password !== props.comment.password) return alert('비밀번호가 일치하지않습니다');
        if(props.modify) {
            //댓글을 수정할때
            props.modifyComment(commentValue);
        }else{
            //댓글을 등록할때

        }
    }
    const onChange = (e) => {
        const {name, value} = e.target;
        setCommentValue({
            ...commentValue,
            [name]: value,
        })
    }
    useEffect(() => {
        if (props.modify) setCommentValue({name: props.comment.name,password: props.comment.password, content: props.comment.content})
    },[props.comment.name, props.comment.password, props.comment.content, props.modify])
    return (
        <div className="commentForm">
        <form onSubmit={handleComment}>
            <legend>댓글달기</legend>
            <p className="name">
                <strong className="label">이름 </strong>
                <input id="comment_name" name="name" value={commentValue.name} type="text" onChange={onChange} />
            </p>
            <p className="password">
                <strong className="label">비밀번호</strong>
                <input id="comment_password" name="password" fw-label="댓글비밀번호" type="password" onChange={onChange} />
            </p>
            <p className="content">
                <strong className="label hide">내용</strong>
                <textarea id="comment_modify" name="content" fw-label="댓글내용" value={commentValue.content} onChange={onChange}></textarea>
            </p>
            <div className="commentBtns">
            {props.modify ?
                <>
                <button type="submit">수정</button>
                <button onClick={() => props.setShowModify(false)}>취소</button>
                </>
              : <button type="submit">댓글등록</button>
            }
            </div>
        </form>
        </div>
    )
}