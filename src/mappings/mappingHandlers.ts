import {Hello, Where} from "../types";
import { MoonbeamEvent } from '@subql/contract-processors/dist/moonbeam';
import { BigNumber } from "ethers";

// Setup types from ABI
type HelloEventArgs = [string, BigNumber] & { sender: string; hi: BigNumber; };
type WhereEventArgs = [string, string] & {here: string; there: string; }

export async function handleHelloEvent(event: MoonbeamEvent<HelloEventArgs>): Promise<void> {
    const hello = new Hello(event.transactionHash);

    hello.hi = event.args.hi.toBigInt();
    hello.sender = event.args.sender;

    await hello.save();
}

export async function handleWhereEvent(event: MoonbeamEvent<WhereEventArgs>): Promise<void> {
    const where = new Where(event.transactionHash);

    where.here = event.args.here;
    where.there = event.args.there;

    await where.save();
}
