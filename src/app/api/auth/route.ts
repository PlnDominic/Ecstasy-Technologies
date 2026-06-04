import { NextResponse } from 'next/server';

// Mock users for demonstration - in a real application, this would use Clerk or a database
const users = [
  { id: 1, email: 'admin@ecstasytechnologies.com', password: 'admin123', role: 'admin' },
  { id: 2, email: 'developer@ecstasytechnologies.com', password: 'dev123', role: 'developer' },
  { id: 3, email: 'client@mapinnovations.com', password: 'client123', role: 'client' }
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // In a real app, we would generate and return a JWT token here
    // For demonstration, we'll just return the user info (minus password)
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token: 'mock-jwt-token' // This would be a real JWT in production
    });
    
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // This would verify a token in a real app
  return NextResponse.json({ message: 'Authentication endpoint' });
} 
