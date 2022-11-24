import Router from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ButtonBack,
  FollowContainer,
  TopButtonConatiner,
  TopFollowActivated,
  TopFollowContainer,
  TopFollowDeactivated,
  Wrapper,
} from './index.style';
import { FollowMember } from './FollowMember';

import Paginator, { NEXT } from '../../utils/paginator';

import type { Props } from '../../pages/user/[userid]/following';

export default function FollowerSection({ userData }: { userData: Props }) {
  const goBack = () => {
    Router.back();
  };

  const [nextCursor, setNextCursor] = useState('START');

  const { loading, error, pages, next } = Paginator(`/api/follow/list/follower/${userData.userid}`, nextCursor);

  const observer = useRef<any>();
  const lastFollowElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && next !== NEXT.END) {
          setNextCursor(next);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, next !== NEXT.END]
  );

  return (
    <Wrapper>
      <TopButtonConatiner>
        <ButtonBack type="button" onClick={goBack} />
        <h1>{userData.nickname || '유저 닉네임'}</h1>
        <div>&nbsp;</div>
      </TopButtonConatiner>
      <TopFollowContainer>
        <TopFollowActivated>
          <Link passHref href={`/user/${userData.userid}/follower`}>
            팔로워
          </Link>
        </TopFollowActivated>
        <TopFollowDeactivated>
          <Link href={`/user/${userData.userid}/following`}>팔로잉</Link>
        </TopFollowDeactivated>
      </TopFollowContainer>
      <FollowContainer>
        {pages.map((item: any, index: number) => {
          if (pages.length === index + 1)
            return (
              <FollowMember
                userid={item.userid}
                nickname={item.nickname}
                profileimg={item.profileimg}
                displayButton
                key={item.targetid}
                ref={lastFollowElementRef}
              />
            );
          return (
            <FollowMember
              userid={item.userid}
              nickname={item.nickname}
              profileimg={item.profileimg}
              displayButton
              key={item.targetid}
            />
          );
        })}
        <div>{loading && 'Loading'}</div>
        <div>{error && 'error'}</div>
        {/* {Array.isArray(userData.FollowingList) &&
          userData.FollowingList.map((item) => {
            return (
              <FollowMember
                userid={item.targetid}
                nickname={item.nickname}
                profileimg={item.profileimg}
                displayButton
              />
            );
          })} */}
      </FollowContainer>
    </Wrapper>
  );
}
