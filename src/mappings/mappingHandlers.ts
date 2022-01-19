import {Hello} from "../types";
import { MoonbeamEvent } from '@subql/contract-processors/dist/moonbeam';
import { BigNumber } from "ethers";

// Setup types from ABI
type HelloEventArgs = [string, BigNumber] & { sender: string; hi: BigNumber; };

export async function handleHelloEvent(event: MoonbeamEvent<HelloEventArgs>): Promise<void> {
    const hello = new Hello(event.transactionHash);

    hello.hi = event.args.hi.toBigInt();
    hello.sender = event.args.sender;

    await hello.save();
}
