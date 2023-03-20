import React from 'react';
import CommentForm from './CommentForm';
import SingleComment from './SingleComment';

function Comment(props) {
    return (
        <div className="boardComment">
            <h3>댓글목록</h3>
            {!props.postData.comment && <p>등록된 댓글이 없습니다.</p>}
            <ul>
                {props.postData.comment && props.postData.comment.map(comment => 
                    <SingleComment comment={comment} key={comment.no} />
                )}
            </ul>
            {props.user.userData.isAuth ?
                <CommentForm postId={props.postId} modify={false} />
                :
                <div className="boardCommentAuthority ">회원에게만 댓글 작성 권한이 있습니다.</div>
            }
        </div>
    );
}

export default Comment;