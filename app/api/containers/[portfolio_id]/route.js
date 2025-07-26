import { NextResponse } from 'next/server';
import DbConnect from '@/lib/db/DbConnect'; 
import { ObjectId } from 'mongodb';
import Container from '@/models/Container';

export async function GET(request, { params }) {
  try {
    const { portfolio_id } =await params;

    // Validate portfolio_id
    if (!portfolio_id || !ObjectId.isValid(portfolio_id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid portfolio ID' },
        { status: 400 }
      );
    }

    // Connect to database
    DbConnect();
    
    const SavedContainer = await Container.findById(portfolio_id);
    

    if (!SavedContainer) {
      return NextResponse.json(
        { success: false, error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: SavedContainer
    });

  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}