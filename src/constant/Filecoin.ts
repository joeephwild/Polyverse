import PolyverseAbi from "./Polyverse.json";
import PolyverseTokenAbi from "./PolyverseToken.json";
import PolyverseSubscriptionAbi from "./SubscriptionContract.json";

const PolyverseToken = "0xf40AF5C3Cc6e17a6CC451eB357Dd6FC430Dab4FE";

const Polyverse = "0x1725F44b449aE325Eab71818ab6E72634Fee3f01";

const SubscriptionContract = "0xb8c90806be2da55652232EdF8eEB817B4C70f813";

const PolyverseABI = PolyverseAbi.abi;
const TokenAbi = PolyverseTokenAbi.abi;
const subscriptionAbi = PolyverseSubscriptionAbi.abi;

export {
  Polyverse,
  PolyverseABI,
  subscriptionAbi,
  SubscriptionContract,
  TokenAbi,
  PolyverseToken,
};
