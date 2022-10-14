export interface GameParams{
  id: string;
  tittle:string;
  bannerUrl:string;

}
export declare global {
  namespace ReactNavigation{
    interface RootParamList{
      home: undefined
      game: GameParams
    }
  }
}