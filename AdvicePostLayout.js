import React, { Component } from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { cloudinaryURL } from '../../../../helpers';

class AdvicePostLayout extends Component {
  onClickLikeBtn(advicePostId, advicePostType, userToken) {
    console.log('advice id: ', advicePostId, 'post type: ', advicePostType, 'user token: ', userToken);
  }

  getPostCreateTime(createdAt) {
    return distanceInWordsToNow(createdAt, { addSuffix: true });
  }

  getCommentsCounter(object) {
    let counter = object.comments.length;
    object.comments.map((item) => {
      counter += item.replycomment.length;
      return true;
    });
    console.log(counter);
    return counter;
  }

  renderCommentsList(array) {
    return array.map(item => (
      <div className="comment" key={item._id}>
        <img
          src={cloudinaryURL(item.user.profilepicture, 60, 60)}
          className="comment__author-pic"
          alt="Author image"
        />
        <div className="comment-body">
          <div className="comment-body__text">
            {
              item.commenttext.length > 130 ?
                item.commenttext.slice(0, 130) :
                item.commenttext
            }
          </div>
          <div className="comment-body-author">
            <div className="comment-body-author__name">
              <a href={item.user.username}>
                {`${item.user.firstname} ${item.user.lastname}`}
              </a>
            </div>
            <span className="comment-body-author__date">
              {this.getPostCreateTime(item.created_At)}
            </span>
          </div>
          <div className="comment-activities">
            <div className="comment-activities__like">likes {item.likes.length}</div>
            <div className="comment-activities__reply">replies {item.replycomment.length}</div>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    console.log(this.props);

    if (!this.props.postInfo.ready) {
      return <div>Loading...</div>;
    }
    const { postData } = this.props.postInfo;

    return (
      <div className="advice-post">
        <div className="advice-post-wrap">
          <div className="advice-post-item">
            <div className="advice-post-item-media">
              <img
                src={cloudinaryURL(postData[0].photo.media.path, 752, 516)}
                alt="advice image"
              />
              <a
                className="advice-post-like-btn"
                onClick={() => this.onClickLikeBtn(postData[0]._id, 'advice', 'userToken')}
              >
                like
              </a>
            </div>
            <div className="advice-post-descr">
              <div className="advice-post-descr__title">
                {postData[0].question}
              </div>
              <div className="advice-post-descr__details">
                {postData[0].questionadditionaldetails}
              </div>
            </div>
            <div className="advice-post-author">
              <img src={cloudinaryURL(postData[0].questionPostedby.profilepicture, 70, 70)} alt="Author image" />
              <div className="advice-post-author__name">
                <a href={postData[0].questionPostedby.username}>
                  {`${postData[0].questionPostedby.firstname} ${postData[0].questionPostedby.lastname}`}
                </a>
              </div>
              <span className="advice-post-author__date">
                {this.getPostCreateTime(postData[0].created_At)}
              </span>
            </div>
          </div>
          <div className="comments" >
            <div className="comments-header">
              <div className="comments-counter">
                {`Comments ${this.getCommentsCounter(postData[0])}`}
              </div>
              <div className="comments-input">
                <img src="" alt="Your image" className="comments-input__user-pic" />
                <input placeholder="Join the conversation…" className="comments-input__field" />
              </div>
            </div>
            <div className="comments-list">
              {this.renderCommentsList(postData[0].comments)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdvicePostLayout;
