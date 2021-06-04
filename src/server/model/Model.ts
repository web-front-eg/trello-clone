export interface ICard {
  pos: number;
  content: string;
}

export interface IList {
  pos: number;
  title: string;
  cards: Array<ICard>;
}

export interface IState {
  lists: Array<IList>;
}
