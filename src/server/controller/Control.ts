import express from "express";
import { HTTP_CODES } from "../model/ServerModel";
import * as Model from "../model/Model";
import storage from "../data/Storage";

export function saveLists(
  request: express.Request,
  response: express.Response
): void {
  // console.log(request);

  const { lists } = request.body;
  if (!lists) {
    response.status(HTTP_CODES.BAD_REQUEST).json({
      status: "failed",
    });
  }

  storage.state = lists as Model.IState;

  response.status(HTTP_CODES.OK).json({
    status: "success",
    data: "lists are safely saved!",
  });
}

export function loadLists(
  _: express.Request,
  response: express.Response
): void {
  const lists = storage.state;
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
