import express from "express";
import { HTTP_CODES } from "../model/ServerModel";
import * as Model from "../model/Model";
import storage from "../data/Storage";
import { isDeepStrictEqual } from "util";
import { delay } from "../util/timer";

export function saveLists(
  request: express.Request,
  response: express.Response
): void {
  // console.log(request);

  const recvState = request.body.lists as Model.IState;
  if (!recvState) {
    response.status(HTTP_CODES.BAD_REQUEST).json({
      status: "failed",
    });
  }

  // for (let i = 0; i < recvState.lists.length; i++) {
  //   const storedList = storage.state.lists[i];
  //   const recvList = recvState.lists[i];
  //   // 저장된 storage 에 해당 lists 가 없으면 그냥 추가
  //   if (!storedList) {
  //     storage.state.lists[i] = recvList;
  //     continue;
  //   }

  //   const storedCards = storedList.cards;
  //   const recvCards = recvList.cards;

  //   // lists 가 있으면, 내부로 들어가 cards 비교
  //   for (let j = 0; j < storedList.cards.length; ++j) {
  //     // 저장된 cards 에 해당 card 가 없으면 그냥 추가
  //     if (!storedCards[j]) {
  //       storedCards[j] = recvCards[j];
  //       continue;
  //     }

  //     // 새로운 pos 에 받은 card 추가!
  //     storedCards[j] = recvCards[j];
  //   }
  // }

  storage.state = recvState as Model.IState;

  response.status(HTTP_CODES.OK).json({
    status: "success",
    data: "lists are safely saved!",
  });
}

export function detectAnyChange(
  request: express.Request,
  response: express.Response
): void {
  const { lists: incoming, id } = request.body;

  console.log("incoming: ", incoming, " || original: ", storage.state);

  if (isDeepStrictEqual(storage.state, incoming)) {
    response.status(HTTP_CODES.OK).json({
      status: "success",
      data: {
        anyChange: false,
        id,
      },
    });
  } else {
    console.log("Something has changed!", id);
    response.status(HTTP_CODES.OK).json({
      status: "success",
      data: {
        anyChange: true,
        id,
      },
    });
  }
  // console.log(`detection start id: ${id}`);
}

export function loadLists(
  _: express.Request,
  response: express.Response
): void {
  const { lists } = storage.state;
  if (!lists) {
    response.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      data: "no lists found!",
    });
  }

  response.status(HTTP_CODES.OK).json({
    status: "success",
    data: {
      lists,
    },
  });
}
