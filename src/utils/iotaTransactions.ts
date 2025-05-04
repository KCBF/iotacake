import { Client, Wallet, Utils } from '@iota/sdk';
import { networks } from '@/config/networks';

export const sendIOTA = async (
  wallet: Wallet,
  recipientAddress: string,
  amount: number,
  network: keyof typeof networks
): Promise<string> => {
  try {
    // Convert amount to IOTA (1 IOTA = 1,000,000 units)
    const amountInUnits = amount * 1000000;
    
    // Create a client for the specified network
    const client = new Client({
      nodes: [networks[network].url],
      localPow: true,
    });

    // Get the wallet's account
    const account = await wallet.getAccount('default');
    
    // Sync the account with the network
    await account.sync();

    // Create a transaction
    const transaction = await account.send(
      recipientAddress,
      amountInUnits.toString()
    );

    // Return the transaction ID
    return transaction.transactionId;
  } catch (error) {
    console.error('Error sending IOTA:', error);
    throw error;
  }
};

export const getBalance = async (
  wallet: Wallet,
  network: keyof typeof networks
): Promise<number> => {
  try {
    const client = new Client({
      nodes: [networks[network].url],
      localPow: true,
    });

    const account = await wallet.getAccount('default');
    await account.sync();
    
    const balance = await account.getBalance();
    // Convert from units to IOTA
    return Number(balance.baseCoin.available) / 1000000;
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
}; 