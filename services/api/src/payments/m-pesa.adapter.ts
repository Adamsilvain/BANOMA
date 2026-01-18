export async function mpesaCharge(phone: string, amount: number) {
  // Adapter skeleton: implement provider-specific auth and charge flow
  return { status: 'queued', provider: 'mpesa', phone, amount }
}