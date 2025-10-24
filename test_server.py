#!/usr/bin/env python
"""Test script to verify server works"""
import sys
try:
    from server import app, get_pipeline
    print("✓ Server imported successfully")
    
    # Test health endpoint
    from fastapi.testclient import TestClient
    client = TestClient(app)
    
    response = client.get("/health")
    assert response.status_code == 200
    print("✓ Health endpoint works:", response.json())
    
    print("\n✓ Server is ready to use!")
    print("Run with: python server.py")
    
except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
