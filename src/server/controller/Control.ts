import express from "express";
import { HTTP_CODES } from "../model/ServerModel";
import * as Model from "../model/Model";
import storage from "../data/Storage";
import { isDeepStrictEqual } from "util";

export function saveLists(
  request: express.Request,
  response: express.Response
) {
  const recvState = request.body.lists as Model.IState;
  if (!recvState) {
    response.status(HTTP_CODES.BAD_REQUEST).json({
      status: "failed",
    });
  }

  storage.state = recvState as Model.IState;

  response.status(HTTP_CODES.OK).json({
    status: "success",
    data: "lists are safely saved!",
  });
}

export function detectAnyChange(
  request: express.Request,
  response: express.Response
) {
  const { lists: incoming } = request.body;

  if (isDeepStrictEqual(storage.state, incoming)) {
    response.status(HTTP_CODES.OK).json({
      status: "success",
      data: {
        anyChange: false,
      },
    });
  } else {
    response.status(HTTP_CODES.OK).json({
      status: "success",
      data: {
        anyChange: true,
      },
    });
  }
}

export function loadLists(_: express.Request, response: express.Response) {
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
