import express from "express";
import { HTTP_CODES } from "../model/ServerModel";
import * as Model from "../model/Model";
import storage from "../data/Storage";
import { isDeepStrictEqual } from "util";

export function saveLists(
  request: express.Request,
  response: express.Response
) {
  const received = request.body.newChanges as Model.IState;

  if (!received) {
    return response.status(HTTP_CODES.BAD_REQUEST).json({
      status: "failed",
      data: "received lists are invalid!",
    });
  }

  storage.state = received;

  return response.status(HTTP_CODES.OK).json({
    status: "success",
    data: "lists are safely saved!",
  });
}

export function detectAnyChange(
  request: express.Request,
  response: express.Response
) {
  const { incoming } = request.body;

  if (isDeepStrictEqual(storage.state, incoming)) {
    return response.status(HTTP_CODES.OK).json({
      status: "success",
      data: {
        anyChange: false,
      },
    });
  } else {
    return response.status(HTTP_CODES.OK).json({
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
    return response.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      data: "no lists found!",
    });
  }

  return response.status(HTTP_CODES.OK).json({
    status: "success",
    data: {
      lists,
    },
  });
}
